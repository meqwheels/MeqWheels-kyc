'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { KycProgressBar } from '@/components/KycProgressBar';
import { RiderKycCard } from '@/components/RiderKycCard';
import { useRental } from '@/context/RentalContext';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Bike,
  Sparkles,
  Printer,
  FileCheck,
  Check,
  RotateCcw,
} from 'lucide-react';

export default function RiderKycPage() {
  const router = useRouter();
  const { session, getAllRiders, getVerificationStats, verifyAllRiders, resetSession } = useRental();
  const [isSimulatingAll, setIsSimulatingAll] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  // Automatically redirect to dynamic booking route if session exists
  useEffect(() => {
    if (session.customerId) {
      router.replace(`/kyc/${encodeURIComponent(session.customerId)}`);
    }
  }, [session.customerId, router]);


  const ridersList = getAllRiders();
  const { total, verified, pending, percent } = getVerificationStats();
  const allVerified = total > 0 && verified === total;

  // Trigger confetti celebration when all riders are verified
  useEffect(() => {
    if (allVerified && !confettiTriggered) {
      setConfettiTriggered(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F97316', '#10B981', '#F59E0B', '#FFFFFF'],
        });
      } catch (e) {
        console.error(e);
      }
    } else if (!allVerified) {
      setConfettiTriggered(false);
    }
  }, [allVerified, confettiTriggered]);

  const handleSimulateAll = async () => {
    setIsSimulatingAll(true);
    await verifyAllRiders();
    setIsSimulatingAll(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#08080C] text-neutral-100">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div className="space-y-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-orange-400 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Rental Session</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              Complete DigiLocker KYC
              <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
                Booking: {session.customerId}
              </span>
            </h1>
            <p className="text-sm text-neutral-400">
              Each rider must independently complete Aadhaar/Driving License verification via DigiLocker.
            </p>
          </div>

          {/* Customer Meta Pill */}
          <div className="flex items-center gap-3 self-start sm:self-auto p-3 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Customer</span>
              <span className="text-xs font-bold text-white block">
                {session.customerName || 'Walk-in Customer'}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {session.phoneNumber ? `+91 ${session.phoneNumber}` : 'No phone'}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Vehicles</span>
              <span className="text-xs font-bold text-orange-400">
                {session.vehicles.length} Units
              </span>
            </div>
          </div>
        </div>

        {/* Progress Indicator Section */}
        <section aria-label="DigiLocker Verification Progress">
          <KycProgressBar
            onSimulateAll={handleSimulateAll}
            isSimulating={isSimulatingAll}
          />
        </section>

        {/* Success All-Verified Banner */}
        {allVerified && (
          <div className="glass-panel p-6 sm:p-7 border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_35px_-5px_rgba(16,185,129,0.2)] animate-in fade-in slide-in-from-top-3 duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    All Riders Verified Successfully
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Ready for Release
                    </span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 mt-0.5">
                    Rental agreement is authorized. All {total} riders have valid DigiLocker credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Gate Pass</span>
                </button>
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>New Rental</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Rider Cards Grid */}
        <section aria-label="Individual Rider DigiLocker Cards">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              Rider DigiLocker Cards ({ridersList.length})
            </h2>

            <span className="text-xs text-neutral-400">
              Booking ID: <strong className="text-orange-400">{session.customerId}</strong>
            </span>
          </div>

          {ridersList.length === 0 ? (
            <div className="glass-panel p-12 text-center space-y-3">
              <p className="text-neutral-400 text-sm">No riders found in this rental session.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Session Creation</span>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-w-xl mx-auto w-full">
              {ridersList.map((item, index) => (
                <RiderKycCard
                  key={item.uniqueKey}
                  item={item}
                  cardIndex={index}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer info bar */}
      <footer className="border-t border-white/[0.06] bg-black/40 py-4 px-4 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MEQ WHEELS Counter Terminal • Government DigiLocker Compliance Engine</span>
          <span className="font-mono text-[11px] text-neutral-600">Booking ID: {session.customerId}</span>
        </div>
      </footer>
    </div>
  );
}
