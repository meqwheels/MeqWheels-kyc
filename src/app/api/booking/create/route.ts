import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/db';
import { kycRecords, NewKycRecord } from '@/db/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, phone, bookingId: customBookingId, vehicles } = body;

    if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'At least one vehicle with a rider is required.' },
        { status: 400 }
      );
    }

    const currentYear = new Date().getFullYear();

    // 1. Determine or generate Booking ID: MEQ-YEAR-XXXXX
    let bookingId = customBookingId?.trim();
    const prefix = `MEQ-${currentYear}-`;
    const suffix = bookingId?.startsWith(prefix)
      ? bookingId.slice(prefix.length).trim()
      : bookingId?.replace(/^MEQ-\d{4}-/i, '').trim();

    if (!bookingId || !suffix) {
      // Auto-generate consistent numeric sequence (e.g. MEQ-2026-10001)
      const randomSeq = Math.floor(10000 + Math.random() * 90000);
      bookingId = `MEQ-${currentYear}-${randomSeq}`;
    } else if (!bookingId.startsWith('MEQ-')) {
      bookingId = `MEQ-${currentYear}-${suffix}`;
    }

    // 2. Flatten all riders across vehicles with sequential Customer IDs
    const recordsToInsert: NewKycRecord[] = [];
    let riderIndex = 1;

    for (const veh of vehicles) {
      const vehicleNo = (veh.vehicleNo || veh.vehicleNumber || 'UNASSIGNED').trim().toUpperCase();
      const riders = Array.isArray(veh.riders)
        ? veh.riders
        : [
            veh.rider1,
            ...(veh.hasSecondRider && veh.rider2 ? [veh.rider2] : []),
          ].filter(Boolean);

      for (const r of riders) {
        if (!r || !r.name) continue;

        const customerId = `${bookingId}-${riderIndex}`;
        recordsToInsert.push({
          bookingId,
          customerId,
          name: r.name.trim(),
          phoneNo: (r.phone || r.phoneNo || phone || '').trim(),
          vehicleNo,
          kycStatus: 'PENDING',
        });
        riderIndex++;
      }
    }

    if (recordsToInsert.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No valid riders found to register.' },
        { status: 400 }
      );
    }

    // 3. Batch insert into D1 / SQLite
    const db = getDb();
    await db.insert(kycRecords).values(recordsToInsert).onConflictDoNothing();

    // 4. Sync to remote Cloudflare D1 database in background
    try {
      const { executeRemoteD1 } = await import('@/db/remote');
      const valuesSql = recordsToInsert
        .map(
          (r) =>
            `('${r.bookingId}', '${r.customerId}', '${r.name.replace(/'/g, "''")}', '${r.phoneNo}', '${r.vehicleNo}', '${r.kycStatus}')`
        )
        .join(', ');
      executeRemoteD1(
        `INSERT OR IGNORE INTO kyc_records (booking_id, customer_id, name, phone_no, vehicle_no, kyc_status) VALUES ${valuesSql};`
      ).catch((e) => console.error('Background remote D1 insert error:', e));
    } catch (e) {
      // Non-blocking
    }

    return NextResponse.json({
      success: true,
      bookingId,
      ridersCount: recordsToInsert.length,
      customerIds: recordsToInsert.map((r) => r.customerId),
    });
  } catch (error: any) {
    console.error('Error creating booking in D1:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while saving booking.' },
      { status: 500 }
    );
  }
}
