import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { kycRecords } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const { bookingId } = await params;

    if (!bookingId) {
      return NextResponse.json(
        { success: false, error: 'Booking ID is required.' },
        { status: 400 }
      );
    }

    const db = getDb();
    let records = await db
      .select()
      .from(kycRecords)
      .where(eq(kycRecords.bookingId, bookingId));

    // If not found locally, query remote Cloudflare D1
    if (!records || records.length === 0) {
      try {
        const { queryRemoteD1 } = await import('@/db/remote');
        const remoteResults = await queryRemoteD1(
          `SELECT booking_id as bookingId, customer_id as customerId, name, phone_no as phoneNo, vehicle_no as vehicleNo, kyc_status as kycStatus FROM kyc_records WHERE booking_id = '${bookingId}'`
        );
        if (remoteResults && remoteResults.length > 0) {
          records = remoteResults;
          // Sync into local cache
          try {
            await db.insert(kycRecords).values(remoteResults).onConflictDoNothing();
          } catch (e) {
            // Ignore cache error
          }
        }
      } catch (err) {
        console.error('Failed to query remote D1:', err);
      }
    }

    if (!records || records.length === 0) {
      return NextResponse.json(
        { success: false, error: `No KYC records found for booking ID: ${bookingId}` },
        { status: 404 }
      );
    }

    // Group riders by vehicle_no
    const vehicleMap = new Map<string, typeof records>();
    records.forEach((record: any) => {
      const vNo = record.vehicleNo || 'UNASSIGNED';
      if (!vehicleMap.has(vNo)) {
        vehicleMap.set(vNo, []);
      }
      vehicleMap.get(vNo)!.push(record);
    });

    const groupedByVehicle = Array.from(vehicleMap.entries()).map(([vehicleNo, riders]) => ({
      vehicleNo,
      riders,
    }));

    const total = records.length;
    const verified = records.filter((r: any) => r.kycStatus === 'VERIFIED').length;
    const pending = total - verified;

    const firstRecord = records[0];
    const customerName = firstRecord?.name || 'Customer';
    const phoneNumber = firstRecord?.phoneNo || '';

    return NextResponse.json({
      success: true,
      bookingId,
      customerName,
      phoneNumber,
      records,
      groupedByVehicle,
      stats: {
        total,
        verified,
        pending,
        percent: total > 0 ? Math.round((verified / total) * 100) : 0,
      },
    });
  } catch (error: any) {
    console.error('Error fetching booking from D1:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while fetching booking.' },
      { status: 500 }
    );
  }
}
