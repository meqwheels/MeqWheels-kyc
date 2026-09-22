'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Calendar, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

export function Header() {
  const [currentDate, setCurrentDate] = useState<string>('');
  const { resetSession, loadDemoData } = useRental();

  useEffect(() => {
    const now = new Date();
    const formatted = new Intl.DateTimeFormat('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(now);
    setCurrentDate(formatted);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/75 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1C1C1E] border border-white/[0.12] text-[#FF9500]">
            <svg
              className="w-5 h-5 text-[#FF9500]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6h-5l-3 6.5h8.5" />
              <path d="M12 17.5V14l-3-3 4-3 2 3h3" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                MEQ <span className="text-[#FF9500]">WHEELS</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase rounded-full bg-white/[0.06] text-[#8E8E93] border border-white/[0.08]">
                Portal
              </span>
            </div>
            <p className="text-[11px] text-[#8E8E93] font-medium -mt-0.5">Rental Counter KYC</p>
          </div>
        </div>

        {/* Badges, Date & Demo Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* MSME Registered Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#34C759]/12 border border-[#34C759]/25 text-[#34C759] text-[11px] font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>MSME Verified</span>
          </div>

          {/* Current Date Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C1C1E] border border-white/[0.08] text-[#8E8E93] text-[11px] font-medium">
            <Calendar className="w-3.5 h-3.5" />
            <span suppressHydrationWarning>{currentDate || 'Today'}</span>
          </div>

          {/* Counter Actions */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
            <button
              onClick={loadDemoData}
              title="Load Demo Rental Scenario"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#8E8E93] hover:text-[#FF9500] hover:bg-[#FF9500]/10 rounded-lg transition-colors border border-transparent hover:border-[#FF9500]/20 ios-pressable cursor-pointer"
            >
              <Zap className="w-3 h-3" />
              <span>Sample Demo</span>
            </button>
            <button
              onClick={resetSession}
              title="Reset Session"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors border border-transparent hover:border-[#FF3B30]/20 ios-pressable cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
