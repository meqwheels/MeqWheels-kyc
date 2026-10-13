'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, Sparkles, RefreshCw, Zap } from 'lucide-react';
import { useRental } from '@/context/RentalContext';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

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
    <header className="relative w-full border-b border-white/[0.08] bg-black/60 backdrop-blur-2xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Logo & Branding — Apple Squircle & Typography */}
        <Link href="/" className="flex items-center gap-3.5 group ios-pressable">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF9500] to-[#E08500] shadow-md shadow-[#FF9500]/20 border border-white/10 shrink-0">
            <svg
              className="w-5 h-5 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
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
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white">
                MEQ <span className="text-[#FF9500]">WHEELS</span>
              </span>
              <span className="hidden xs:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-white/[0.06] text-[#8E8E93] border border-white/[0.08]">
                Counter Terminal
              </span>
            </div>
            <p className="text-[11px] text-[#8E8E93] font-normal leading-tight">DigiLocker KYC Verification</p>
          </div>
        </Link>

        {/* Badges, Date & Demo Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* MSME Registered Badge with Vengeance UI Tooltip */}
          <AnimatedTooltip
            content="Official MSME Gov Registered Enterprise"
            variant="smaug"
            shapeColor="#34C759"
            textColor="#000000"
            className="p-0 inline-flex items-center"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#34C759]/15 border border-[#34C759]/25 text-[#34C759] text-xs font-semibold shadow-sm cursor-pointer ios-pressable">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34C759]" />
              <span>MSME Registered</span>
            </div>
          </AnimatedTooltip>

          {/* Current Date — iOS Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1C1C1E] border border-white/[0.08] text-[#8E8E93] text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#8E8E93]" />
            <span suppressHydrationWarning>{currentDate || 'Today'}</span>
          </div>

          {/* Quick Demo Fill & Reset buttons */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-1">
            <button
              type="button"
              onClick={loadDemoData}
              title="Load Demo Rental Scenario"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#8E8E93] hover:text-[#FF9500] hover:bg-white/[0.04] rounded-xl transition-colors border border-transparent hover:border-white/[0.08] ios-pressable cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF9500]" />
              <span className="hidden md:inline">Sample Demo</span>
            </button>
            <button
              type="button"
              onClick={resetSession}
              title="Reset Session"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#8E8E93] hover:text-[#FF453A] hover:bg-white/[0.04] rounded-xl transition-colors border border-transparent hover:border-white/[0.08] ios-pressable cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
