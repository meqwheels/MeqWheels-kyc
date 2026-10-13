'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Loader2, Phone, User, RotateCcw } from 'lucide-react';
import { FlattenedRiderKYC } from '@/types/kyc';
import { useRental } from '@/context/RentalContext';
import { BorderBeam } from '@/components/ui/border-beam';
import { AnimatedButton } from '@/components/ui/animated-button';

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
  isVerifying: isVerifyingProp,
}: RiderKycCardProps) {
  const { verifyRider, resetRiderVerification } = useRental();
  const { rider, vehicleId, vehicleNumber, customerId } = item;

  const isVerified = rider.kycStatus === 'verified';
  const isVerifying = isVerifyingProp !== undefined ? isVerifyingProp : rider.kycStatus === 'verifying';
  const isPending = !isVerified && !isVerifying;

  const handleVerify = () => {
    if (isPending) {
      if (onVerify) {
        onVerify(customerId);
      } else {
        verifyRider(vehicleId, rider.id);
      }
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReset) {
      onReset(customerId);
    } else {
      resetRiderVerification(vehicleId, rider.id);
    }
  };

  return (
    <div
      className={`bg-[#1C1C1E] border rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 ${
        isVerified
          ? 'border-[#34C759]/40 shadow-[0_4px_24px_rgba(52,199,89,0.12)]'
          : isVerifying
          ? 'border-[#0A84FF]/40 shadow-[0_4px_24px_rgba(10,132,255,0.12)]'
          : 'border-white/[0.08] hover:border-white/[0.18]'
      }`}
    >
      {/* Vengeance UI dynamic border beam effect based on verification status */}
      {isVerified && (
        <BorderBeam
          size={240}
          duration={14}
          colorFrom="#34C759"
          colorTo="#30D158"
          borderWidth={1.5}
        />
      )}
      {isVerifying && (
        <BorderBeam
          size={240}
          duration={8}
          colorFrom="#0A84FF"
          colorTo="#5856D6"
          borderWidth={1.5}
        />
      )}
      {isPending && (
        <BorderBeam
          size={240}
          duration={16}
          delay={cardIndex * 1.5}
          colorFrom="#FF9500"
          colorTo="#FF2D55"
          borderWidth={1.5}
        />
      )}

      {/* Top Card Bar: Card Index & Linked Customer */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06] mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-[#2C2C2E] text-xs font-mono font-semibold text-white">
            0{cardIndex + 1}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
            Card {cardIndex + 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-white/[0.04] text-[#8E8E93] border border-white/[0.06]">
            Booking: {item.bookingId || customerId}
          </span>
          {isVerified && (
            <button
              onClick={handleReset}
              title="Reset verification for demo"
              className="text-[#8E8E93] hover:text-white text-xs p-1 hover:bg-white/5 rounded-lg transition-colors ios-pressable cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Card Details: Inset Grouped style */}
      <div className="space-y-3.5 mb-5 text-xs sm:text-sm relative z-10">
        {/* Vehicle */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#8E8E93]">Vehicle:</span>
          <span className="font-mono font-semibold text-xs sm:text-sm tracking-wider text-white px-2.5 py-1 rounded-lg bg-[#2C2C2E] border border-white/[0.06]">
            {vehicleNumber || 'NOT ASSIGNED'}
          </span>
        </div>

        {/* Rider */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#8E8E93]">Rider:</span>
          <div className="flex items-center gap-1.5 text-right">
            <User className="w-3.5 h-3.5 text-[#8E8E93]" />
            <span className="font-semibold text-xs sm:text-sm text-white">
              {rider.name || 'Unnamed Rider'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-white/[0.06] text-[#8E8E93] font-medium">
              Rider {item.globalRiderNumber ?? cardIndex + 1}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#8E8E93]">Phone:</span>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#8E8E93]" />
            <span className="font-mono text-xs sm:text-sm text-[#E5E5EA]">
              {rider.phone ? `+91 ${rider.phone}` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Customer ID */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-normal text-[#8E8E93]">Customer ID:</span>
          <span className="font-mono font-medium text-xs text-[#0A84FF] px-2 py-0.5 rounded-md bg-[#0A84FF]/10 border border-[#0A84FF]/20">
            {item.customerSpecificId || (customerId?.trim() ? `${customerId.trim()}${item.globalRiderNumber ?? cardIndex + 1}` : `MEQ-${new Date().getFullYear()}-00001${item.globalRiderNumber ?? cardIndex + 1}`)}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <span className="text-xs font-normal text-[#8E8E93]">Status:</span>
          <div>
            {isPending && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/25">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500]" />
                Pending
              </span>
            )}
            {isVerifying && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/25">
                <Loader2 className="w-3 h-3 animate-spin text-[#0A84FF]" />
                Verifying...
              </span>
            )}
            {isVerified && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/25">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759]" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button: Complete KYC or Disabled Verified */}
      <div className="relative z-10">
        {isPending && (
          <AnimatedButton
            type="button"
            onClick={handleVerify}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FF9500] hover:bg-[#FF9F0A] text-black font-semibold text-xs sm:text-sm tracking-tight shadow-sm border border-white/10 ios-pressable flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
          >
            <span className="flex items-center justify-center gap-2 text-black">
              <ShieldCheck className="w-4 h-4 text-black" />
              <span>Complete DigiLocker KYC</span>
            </span>
          </AnimatedButton>
        )}

        {isVerifying && (
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2C2C2E] text-[#8E8E93] font-medium text-xs sm:text-sm border border-white/[0.06] cursor-wait min-h-[42px]"
          >
            <Loader2 className="w-4 h-4 animate-spin text-[#0A84FF]" />
            <span>Connecting DigiLocker...</span>
          </button>
        )}

        {isVerified && (
          <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#34C759]/15 text-[#34C759] font-medium text-xs sm:text-sm border border-[#34C759]/25 min-h-[42px]">
            <CheckCircle2 className="w-4 h-4 text-[#34C759]" />
            <span>KYC Completed</span>
          </div>
        )}
      </div>

      {/* Footer Info for Verified */}
      {isVerified && rider.referenceId && (
        <div className="mt-3 flex items-center justify-between text-[10px] text-[#8E8E93] font-mono">
          <span>Ref: {rider.referenceId}</span>
          <span>Verified {rider.verifiedAt}</span>
        </div>
      )}
    </div>
  );
}
