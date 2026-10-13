import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { kycConsents } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      bookingId,
      customerId,
      riderName,
      purpose = 'Identity and Driving Licence verification for two-wheeler vehicle rental under Motor Vehicles Act, 1988',
      consentVersion = 'v1.0-2026',
      agreed = false,
    } = body;

    if (!bookingId || !customerId || !riderName) {
      return NextResponse.json(
        { success: false, error: 'bookingId, customerId, and riderName are required.' },
        { status: 400 }
      );
    }

    const consentId = `CNS-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const status = agreed ? 'GRANTED' : 'DECLINED';
    const createdAt = new Date().toISOString();

    const db = getDb();
    await db.insert(kycConsents).values({
      id: consentId,
      bookingId: bookingId.trim(),
      customerId: customerId.trim(),
      riderName: riderName.trim(),
      purpose: purpose.trim(),
      consentVersion: consentVersion.trim(),
      status,
      createdAt,
    });

    // Background sync to remote Cloudflare D1 if configured
    try {
      const { executeRemoteD1 } = await import('@/db/remote');
      const safeRider = riderName.replace(/'/g, "''");
      const safePurpose = purpose.replace(/'/g, "''");
      executeRemoteD1(
        `INSERT INTO kyc_consents (id, booking_id, customer_id, rider_name, purpose, consent_version, status, created_at) VALUES ('${consentId}', '${bookingId}', '${customerId}', '${safeRider}', '${safePurpose}', '${consentVersion}', '${status}', '${createdAt}');`
      ).catch((err) => console.error('Remote D1 consent log error:', err));
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      consentId,
      status,
      customerId,
      recordedAt: createdAt,
    });
  } catch (err: any) {
    console.error('Error recording consent:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to record consent.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get('customerId');

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'customerId query parameter is required.' },
        { status: 400 }
      );
    }

    const db = getDb();
    const rows = await db
      .select()
      .from(kycConsents)
      .where(and(eq(kycConsents.customerId, customerId), eq(kycConsents.status, 'GRANTED')))
      .orderBy(desc(kycConsents.createdAt))
      .limit(1);

    const hasConsent = rows && rows.length > 0;
    return NextResponse.json({
      success: true,
      hasConsent,
      consent: hasConsent ? rows[0] : null,
    });
  } catch (err: any) {
    console.error('Error checking consent:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to check consent.' },
      { status: 500 }
    );
  }
}
