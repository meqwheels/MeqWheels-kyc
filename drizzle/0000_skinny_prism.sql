CREATE TABLE `kyc_records` (
	`booking_id` text NOT NULL,
	`customer_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone_no` text NOT NULL,
	`vehicle_no` text NOT NULL,
	`aadhaar_no` text,
	`aadhaar_file` text,
	`dl_no` text,
	`dl_file` text,
	`kyc_status` text DEFAULT 'PENDING',
	`created_at` text DEFAULT CURRENT_TIMESTAMP
);
