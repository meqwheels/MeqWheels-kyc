import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { kycRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerId,
      agreed = false,
    } = body;

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'customerId is required.' },
        { status: 400 }
      );
    }

    const trimmedCustomerId = customerId.trim();
    const newStatus = agreed ? 'VERIFIED' : 'PENDING';

    const db = getDb();
    // Update existing table kyc_records directly
    await db
      .update(kycRecords)
      .set({ kycStatus: newStatus })
      .where(eq(kycRecords.customerId, trimmedCustomerId));

    // Background sync to remote Cloudflare D1 if configured
    try {
      const { executeRemoteD1 } = await import('@/db/remote');
      executeRemoteD1(
        `UPDATE kyc_records SET kyc_status = '${newStatus}' WHERE customer_id = '${trimmedCustomerId}';`
      ).catch((err) => console.error('Remote D1 update error:', err));
    } catch {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      customerId: trimmedCustomerId,
      status: newStatus,
      agreed,
      recordedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error updating status in kyc_records:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update record in kyc_records.' },
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
      .from(kycRecords)
      .where(eq(kycRecords.customerId, customerId.trim()))
      .limit(1);

    const isVerified = rows && rows.length > 0 && rows[0].kycStatus === 'VERIFIED';
    return NextResponse.json({
      success: true,
      hasConsent: isVerified,
      record: rows && rows.length > 0 ? rows[0] : null,
    });
  } catch (err: any) {
    console.error('Error querying kyc_records:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to query kyc_records.' },
      { status: 500 }
    );
  }
}
