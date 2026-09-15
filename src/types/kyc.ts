export type KYCStatus = 'pending' | 'verifying' | 'verified';

export interface Rider {
  id: string;
  riderNumber: 1 | 2;
  name: string;
  phone: string;
  kycStatus: KYCStatus;
  verifiedAt?: string;
  referenceId?: string;
}

export interface Vehicle {
  id: string;
  vehicleNumber: string;
  hasSecondRider: boolean;
  rider1: Rider;
  rider2?: Rider;
}

export interface CustomerSession {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  vehicles: Vehicle[];
  createdAt: string;
  updatedAt: string;
}

export interface FlattenedRiderKYC {
  uniqueKey: string;
  vehicleId: string;
  vehicleNumber: string;
  rider: Rider;
  customerName: string;
  customerId: string;
}
