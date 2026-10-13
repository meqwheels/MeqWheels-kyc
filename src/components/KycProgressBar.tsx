'use client';

import React from 'react';
import { CheckCircle2, Clock, CheckCheck } from 'lucide-react';
import { useRental } from '@/context/RentalContext';
import { BorderBeam } from '@/components/ui/border-beam';

interface KycProgressBarProps {
  onSimulateAll?: () => void | Promise<void>;
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
  stats: statsProp,
  customerName: customerNameProp,
  bookingId: bookingIdProp,
}: KycProgressBarProps) {
  const { getVerificationStats, session } = useRental();
  const { total, verified, pending, percent } = statsProp ?? getVerificationStats();
  const customerName = customerNameProp ?? session.customerName;
  const bookingId = bookingIdProp ?? session.customerId;
  const isComplete = total > 0 && verified === total;

  return (
    <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
      <BorderBeam
        size={240}
        duration={18}
        colorFrom={isComplete ? '#34C759' : '#0A84FF'}
        colorTo={isComplete ? '#30D158' : '#FF9500'}
        borderWidth={1.5}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
        {/* Title and Counter */}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block">
              Verification Progress
            </span>
            {isComplete ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/25">
                <CheckCircle2 className="w-3 h-3" /> All Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/25">
                <Clock className="w-3 h-3" /> In Progress
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1 flex items-baseline gap-2">
            <span>{verified} / {total}</span>
            <span className="text-sm sm:text-base font-normal text-[#8E8E93]">Riders Verified</span>
          </div>
        </div>

        {/* Quick action controls for counter staff */}
        <div className="flex items-center gap-3">
          {!isComplete && onSimulateAll && (
            <button
              type="button"
              onClick={onSimulateAll}
              disabled={isSimulating}
              className="px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.08] text-xs font-medium tracking-tight cursor-pointer disabled:opacity-40 ios-pressable flex items-center gap-1.5"
            >
              <CheckCheck className="w-3.5 h-3.5 text-[#0A84FF]" />
              <span>{isSimulating ? 'Verifying All...' : 'Simulate Verify All'}</span>
            </button>
          )}

          <div className="text-right">
            <span className="text-xl font-bold font-mono text-white">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Track — Apple System Bar */}
      <div className="relative z-10 w-full h-2.5 bg-[#2C2C2E] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete ? 'bg-[#34C759]' : 'bg-[#FF9500]'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Details Strip */}
      <div className="flex items-center justify-between text-xs text-[#8E8E93] mt-3 relative z-10">
        <span>
          Customer: <strong className="text-white font-medium">{customerName || 'N/A'}</strong>
          {bookingId ? ` • Booking ${bookingId}` : ''}
        </span>
        <span>{pending > 0 ? `${pending} pending verification` : 'Ready for vehicle dispatch'}</span>
      </div>
    </div>
  );
}
