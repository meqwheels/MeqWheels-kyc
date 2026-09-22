'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Loader2, Phone, User, RotateCcw } from 'lucide-react';
import { FlattenedRiderKYC } from '@/types/kyc';
import { useRental } from '@/context/RentalContext';

interface RiderKycCardProps {
  item: FlattenedRiderKYC;
  cardIndex: number;
  onVerify?: (customerId: string) => Promise<void> | void;
  onReset?: (customerId: string) => Promise<void> | void;
  isVerifying?: boolean;
}

export function RiderKycCard({
  item,
  cardIndex,
  onVerify,
  onReset,
  isVerifying: propIsVerifying,
}: RiderKycCardProps) {
  const { verifyRider, resetRiderVerification } = useRental();
  const { rider, vehicleId, vehicleNumber, customerId } = item;

  const displayCustomerId = item.customerSpecificId
    ? item.customerSpecificId
    : /-\d+$/.test(customerId)
    ? customerId
    : `${customerId?.trim() || `MEQ-${new Date().getFullYear()}-00001`}-${item.globalRiderNumber ?? cardIndex + 1}`;

  const displayBookingId = item.bookingId
    ? item.bookingId
    : /-\d+$/.test(customerId)
    ? customerId.replace(/-\d+$/, '')
    : (customerId || 'N/A');

  const isPending = rider.kycStatus === 'pending';
  const isVerifying = propIsVerifying || rider.kycStatus === 'verifying';
  const isVerified = rider.kycStatus === 'verified';

  const handleVerify = async () => {
    if (isPending && !isVerifying) {
      if (onVerify) {
        await onVerify(displayCustomerId);
      } else {
        verifyRider(vehicleId, rider.id);
      }
    }
  };

  const handleReset = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReset) {
      await onReset(displayCustomerId);
    } else {
      resetRiderVerification(vehicleId, rider.id);
    }
  };

  return (
    <div
      className={`rounded-2xl p-5 sm:p-5.5 space-y-4 transition-all duration-200 ${
        isVerified
          ? 'bg-[#1C1C1E] border border-[#34C759]/30'
          : 'bg-[#1C1C1E] border border-white/[0.08]'
      }`}
    >
      {/* Top Bar: Card & Rider Index */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-[#2C2C2E] text-[11px] font-mono font-semibold text-white">
            0{cardIndex + 1}
          </span>
          <span className="text-xs font-semibold text-white">
            Rider {item.globalRiderNumber ?? cardIndex + 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[#2C2C2E] text-[#8E8E93]">
            {displayBookingId}
          </span>
          {isVerified && (
            <button
              onClick={handleReset}
              title="Reset verification for demo"
              className="text-[#8E8E93] hover:text-white text-xs p-1 hover:bg-white/10 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="space-y-2.5 text-xs">
        {/* Rider Name */}
        <div className="flex items-center justify-between">
          <span className="text-[#8E8E93]">Rider Name</span>
          <span className="text-sm font-semibold text-white">
            {rider.name || 'Unnamed Rider'}
          </span>
        </div>

        {/* Assigned Vehicle */}
        <div className="flex items-center justify-between">
          <span className="text-[#8E8E93]">Assigned Vehicle</span>
          <span className="font-mono font-semibold text-xs tracking-wider text-white px-2 py-0.5 rounded-md bg-[#2C2C2E]">
            {vehicleNumber || 'UNASSIGNED'}
          </span>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <span className="text-[#8E8E93]">Mobile</span>
          <span className="font-mono text-white">
            {rider.phone ? `+91 ${rider.phone}` : 'N/A'}
          </span>
        </div>

        {/* Customer ID */}
        <div className="flex items-center justify-between">
          <span className="text-[#8E8E93]">Customer ID</span>
          <span className="font-mono font-medium text-[11px] text-[#FF9500] px-2 py-0.5 rounded-md bg-[#FF9500]/10">
            {displayCustomerId}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
          <span className="text-[#8E8E93]">Status</span>
          <div>
            {isPending && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FF9500]/12 text-[#FF9500] border border-[#FF9500]/25">
                <Clock className="w-3 h-3" />
                <span>Pending</span>
              </span>
            )}
            {isVerifying && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FF9500]/12 text-[#FF9500] border border-[#FF9500]/25">
                <Loader2 className="w-3 h-3 animate-spin" />
                <span>Verifying...</span>
              </span>
            )}
            {isVerified && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#34C759]/12 text-[#34C759] border border-[#34C759]/25">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button: Complete KYC or Completed */}
      <div className="pt-1">
        {isPending && (
          <button
            type="button"
            onClick={handleVerify}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FF9500] hover:bg-[#FF9500]/90 text-white font-semibold text-xs tracking-wide shadow-sm ios-pressable cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Complete KYC</span>
          </button>
        )}

        {isVerifying && (
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2C2C2E] text-[#8E8E93] font-medium text-xs cursor-wait"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Connecting DigiLocker...</span>
          </button>
        )}

        {isVerified && (
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#34C759]/12 text-[#34C759] border border-[#34C759]/25 font-medium text-xs cursor-default"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>KYC Completed</span>
          </button>
        )}
      </div>

      {/* Footer Info for Verified */}
      {isVerified && rider.referenceId && (
        <div className="flex items-center justify-between text-[10px] text-[#636366] font-mono pt-0.5">
          <span>Ref: {rider.referenceId}</span>
          <span>{rider.verifiedAt}</span>
        </div>
      )}
    </div>
  );
}
