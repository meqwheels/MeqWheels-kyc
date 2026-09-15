'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Loader2, Phone, User, RotateCcw } from 'lucide-react';
import { FlattenedRiderKYC } from '@/types/kyc';
import { useRental } from '@/context/RentalContext';

interface RiderKycCardProps {
  item: FlattenedRiderKYC;
  cardIndex: number;
}

export function RiderKycCard({ item, cardIndex }: RiderKycCardProps) {
  const { verifyRider, resetRiderVerification } = useRental();
  const { rider, vehicleId, vehicleNumber, customerId } = item;

  const isPending = rider.kycStatus === 'pending';
  const isVerifying = rider.kycStatus === 'verifying';
  const isVerified = rider.kycStatus === 'verified';

  const handleVerify = () => {
    if (isPending) {
      verifyRider(vehicleId, rider.id);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    resetRiderVerification(vehicleId, rider.id);
  };

  return (
    <div
      className={`glass-panel p-6 relative overflow-hidden transition-all duration-300 ${
        isVerified
          ? 'border-emerald-500/30 bg-emerald-950/10 shadow-[0_0_25px_-5px_rgba(16,185,129,0.12)]'
          : 'hover:border-white/20'
      }`}
    >
      {/* Top Card Bar: Card Index & Linked Customer */}
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-xl bg-white/[0.04] text-xs font-mono font-bold text-neutral-300 border border-white/[0.08]">
            0{cardIndex + 1}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Card {cardIndex + 1}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
            Booking: {customerId}
          </span>
          {isVerified && (
            <button
              onClick={handleReset}
              title="Reset verification for demo"
              className="text-neutral-500 hover:text-neutral-300 text-xs p-1 hover:bg-white/5 rounded transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Card Details: Vehicle, Rider, Phone, Status */}
      <div className="space-y-4 mb-6">
        {/* Vehicle */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">Vehicle:</span>
          <span className="font-mono font-bold text-sm tracking-wider text-white px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08]">
            {vehicleNumber || 'NOT ASSIGNED'}
          </span>
        </div>

        {/* Rider */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">Rider:</span>
          <div className="flex items-center gap-1.5 text-right">
            <User className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-semibold text-sm text-white">
              {rider.name || 'Unnamed Rider'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 font-medium">
              Rider {item.globalRiderNumber ?? cardIndex + 1}
            </span>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">Phone:</span>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-neutral-400" />
            <span className="font-mono text-sm text-neutral-300">
              {rider.phone ? `+91 ${rider.phone}` : 'N/A'}
            </span>
          </div>
        </div>

        {/* Customer ID (Derived from Booking ID + Rider number) */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-neutral-400">Customer ID:</span>
          <span className="font-mono font-bold text-xs tracking-wider text-orange-400 px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/25 shadow-sm">
            {customerId?.trim() ? `${customerId.trim()}${item.globalRiderNumber ?? cardIndex + 1}` : `MEQ-${new Date().getFullYear()}-00001${item.globalRiderNumber ?? cardIndex + 1}`}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
          <span className="text-xs font-medium text-neutral-400">Status:</span>
          <div>
            {isPending && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Pending
              </span>
            )}
            {isVerifying && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                <Loader2 className="w-3 h-3 animate-spin text-orange-400" />
                Verifying...
              </span>
            )}
            {isVerified && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Button: Complete KYC or Disabled Verified */}
      <div>
        {isPending && (
          <button
            type="button"
            onClick={handleVerify}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all duration-200 cursor-pointer active:scale-[0.99]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Complete KYC</span>
          </button>
        )}

        {isVerifying && (
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-800/80 text-orange-400 font-semibold text-xs sm:text-sm border border-orange-500/20 cursor-wait"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Connecting DigiLocker...</span>
          </button>
        )}

        {isVerified && (
          <button
            type="button"
            disabled
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500/10 text-emerald-400 font-semibold text-xs sm:text-sm border border-emerald-500/20 cursor-not-allowed"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>KYC Completed</span>
          </button>
        )}
      </div>

      {/* Footer Info for Verified */}
      {isVerified && rider.referenceId && (
        <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500 font-mono">
          <span>Ref: {rider.referenceId}</span>
          <span>Verified {rider.verifiedAt}</span>
        </div>
      )}
    </div>
  );
}
