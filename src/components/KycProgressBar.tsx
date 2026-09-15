'use client';

import React from 'react';
import { CheckCircle2, Clock, Sparkles, CheckCheck, RotateCcw } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

interface KycProgressBarProps {
  onSimulateAll?: () => void;
  isSimulating?: boolean;
}

export function KycProgressBar({ onSimulateAll, isSimulating }: KycProgressBarProps) {
  const { getVerificationStats, session } = useRental();
  const { total, verified, pending, percent } = getVerificationStats();
  const isComplete = total > 0 && verified === total;

  return (
    <div className="glass-panel p-5 sm:p-6 relative overflow-hidden transition-all duration-300">
      {/* Background glow when complete */}
      {isComplete && (
        <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none -z-10" />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        {/* Title and Counter */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              KYC Progress
            </h2>
            {isComplete ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Clock className="w-3.5 h-3.5" /> In Progress
              </span>
            )}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-baseline gap-2">
            <span>{verified} / {total}</span>
            <span className="text-sm sm:text-base font-semibold text-neutral-400">Riders Verified</span>
          </div>
        </div>

        {/* Quick action controls for staff */}
        <div className="flex items-center gap-2.5">
          {!isComplete && onSimulateAll && (
            <button
              type="button"
              onClick={onSimulateAll}
              disabled={isSimulating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold tracking-wide transition-all disabled:opacity-50 cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{isSimulating ? 'Verifying All...' : 'Simulate Verify All'}</span>
            </button>
          )}

          <div className="text-right">
            <span className="text-xl font-bold font-mono text-white">{percent}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div className="relative w-full h-3 bg-neutral-900/80 rounded-full overflow-hidden p-0.5 border border-white/[0.08]">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
              : 'bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 shadow-[0_0_12px_rgba(249,115,22,0.4)]'
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Mini details strip */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2.5">
        <span>Customer: <strong className="text-white font-medium">{session.customerName || 'N/A'}</strong> ({session.customerId})</span>
        <span>{pending > 0 ? `${pending} pending verification` : 'Ready for vehicle release'}</span>
      </div>
    </div>
  );
}
