'use client';

import React from 'react';
import { CheckCircle2, Clock, CheckCheck } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

interface KycProgressBarProps {
  onSimulateAll?: () => void;
  isSimulating?: boolean;
  stats?: {
    total: number;
    verified: number;
    pending: number;
    percent: number;
  };
  customerName?: string;
  bookingId?: string;
}

export function KycProgressBar({
  onSimulateAll,
  isSimulating,
  stats: propStats,
  customerName: propCustomerName,
  bookingId: propBookingId,
}: KycProgressBarProps) {
  const { getVerificationStats, session } = useRental();
  const contextStats = getVerificationStats();
  const { total, verified, pending, percent } = propStats || contextStats;
  const isComplete = total > 0 && verified === total;

  const displayCustomerName = propCustomerName ?? session.customerName;
  const displayBookingId = propBookingId ?? session.customerId;

  return (
    <div className="bg-[#1C1C1E] rounded-2xl border border-white/[0.08] p-5 sm:p-6 space-y-4">
      {/* Metric Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
              KYC Verification
            </span>
            {isComplete ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#34C759]/12 text-[#34C759] border border-[#34C759]/25">
                <CheckCircle2 className="w-3 h-3" /> All Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FF9500]/12 text-[#FF9500] border border-[#FF9500]/25">
                <Clock className="w-3 h-3" /> In Progress
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 flex items-baseline gap-2">
            <span>{verified} of {total}</span>
            <span className="text-xs sm:text-sm font-normal text-[#8E8E93]">Riders Verified</span>
          </div>
        </div>

        {/* Action Controls & Percentage */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {!isComplete && onSimulateAll && (
            <button
              type="button"
              onClick={onSimulateAll}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF9500]/12 hover:bg-[#FF9500]/20 text-[#FF9500] border border-[#FF9500]/25 text-xs font-medium transition-all disabled:opacity-50 ios-pressable cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Verifying...' : 'Simulate All'}</span>
            </button>
          )}

          <div className="text-right">
            <span className="text-lg font-bold font-mono text-white">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Apple System Progress Capsule Track */}
      <div className="w-full h-2.5 bg-[#2C2C2E] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete ? 'bg-[#34C759]' : 'bg-[#FF9500]'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Metadata Footnote */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#8E8E93] gap-1 pt-0.5">
        <span>
          Customer: <strong className="text-white font-medium">{displayCustomerName || 'Walk-in'}</strong> ({displayBookingId})
        </span>
        <span className={isComplete ? 'text-[#34C759] font-medium' : 'text-[#8E8E93]'}>
          {pending > 0 ? `${pending} pending DigiLocker verification` : '✓ Eligible for vehicle handover'}
        </span>
      </div>
    </div>
  );
}
