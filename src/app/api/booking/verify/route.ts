import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { kycRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  return handleVerification(req);
}

export async function PATCH(req: NextRequest) {
  return handleVerification(req);
}

async function handleVerification(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerId, kycStatus = 'VERIFIED' } = body;

    if (!customerId) {
      return NextResponse.json(
        { success: false, error: 'Customer ID is required.' },
        { status: 400 }
      );
    }

    const db = getDb();
    await db
      .update(kycRecords)
      .set({ kycStatus: kycStatus.toUpperCase() })
      .where(eq(kycRecords.customerId, customerId));

    // Sync to remote Cloudflare D1 database
    try {
      const { executeRemoteD1 } = await import('@/db/remote');
      executeRemoteD1(
        `UPDATE kyc_records SET kyc_status = '${kycStatus.toUpperCase()}' WHERE customer_id = '${customerId}';`
      ).catch((e) => console.error('Background remote D1 verify error:', e));
    } catch (e) {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      customerId,
      kycStatus: kycStatus.toUpperCase(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error updating KYC status in D1:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while updating status.' },
      { status: 500 }
    );
  }
}
