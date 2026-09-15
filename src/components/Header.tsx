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
    <header className="relative w-full border-b border-white/[0.08] bg-black/40 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Logo & Branding */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/25 border border-orange-400/40">
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6h-5l-3 6.5h8.5" />
              <path d="M12 17.5V14l-3-3 4-3 2 3h3" />
            </svg>
            <div className="absolute -inset-0.5 rounded-2xl bg-orange-500/30 blur-sm -z-10" />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                MEQ <span className="text-orange-500">WHEELS</span>
              </h1>
              <span className="hidden xs:inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 shimmer-badge">
                <Sparkles className="w-3 h-3 text-orange-400" />
                Portal
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">Rental Counter KYC</p>
          </div>
        </div>

        {/* Badges, Date & Demo Controls */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
          {/* MSME Registered Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>MSME Registered</span>
          </div>

          {/* Current Date */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-neutral-300 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span suppressHydrationWarning>{currentDate || 'Today'}</span>
          </div>

          {/* Quick Demo Fill & Reset buttons for counter convenience */}
          <div className="flex items-center gap-1.5 ml-auto sm:ml-2">
            <button
              onClick={loadDemoData}
              title="Load Demo Rental Scenario"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-400 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-colors border border-transparent hover:border-orange-500/20"
            >
              <Zap className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sample Demo</span>
            </button>
            <button
              onClick={resetSession}
              title="Reset Session"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
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
