import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const kycRecords = sqliteTable('kyc_records', {
  bookingId: text('booking_id').notNull(),
  customerId: text('customer_id').primaryKey(),

  name: text('name').notNull(),
  phoneNo: text('phone_no').notNull(),
  vehicleNo: text('vehicle_no').notNull(),

  aadhaarNo: text('aadhaar_no'),
  aadhaarFile: text('aadhaar_file'),

  dlNo: text('dl_no'),
  dlFile: text('dl_file'),

  kycStatus: text('kyc_status').default('PENDING'),

  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type KycRecord = typeof kycRecords.$inferSelect;
export type NewKycRecord = typeof kycRecords.$inferInsert;
