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

export const kycConsents = sqliteTable('kyc_consents', {
  id: text('id').primaryKey(),
  bookingId: text('booking_id').notNull(),
  customerId: text('customer_id').notNull(),
  riderName: text('rider_name').notNull(),
  purpose: text('purpose').notNull(),
  consentVersion: text('consent_version').notNull(),
  status: text('status').notNull(), // 'GRANTED' | 'DECLINED'
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export type KycConsent = typeof kycConsents.$inferSelect;
export type NewKycConsent = typeof kycConsents.$inferInsert;
