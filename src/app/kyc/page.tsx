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
  ChevronLeft,
  CheckCircle2,
  Printer,
  Sparkles,
} from 'lucide-react';

export default function RiderKycPage() {
  const router = useRouter();
  const { session, getAllRiders, getVerificationStats, verifyAllRiders } = useRental();
  const [isSimulatingAll, setIsSimulatingAll] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  useEffect(() => {
    if (session.customerId) {
      router.replace(`/kyc/${encodeURIComponent(session.customerId)}`);
    }
  }, [session.customerId, router]);

  const ridersList = getAllRiders();
  const { total, verified, percent } = getVerificationStats();
  const allVerified = total > 0 && verified === total;

  useEffect(() => {
    if (allVerified && !confettiTriggered) {
      setConfettiTriggered(true);
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#FF9500', '#34C759', '#FFFFFF'],
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
    <div className="flex flex-col min-h-screen bg-black text-[#F5F5F7]">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-1">
          <div className="space-y-1.5">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Session</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span>DigiLocker KYC</span>
              <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#1C1C1E] text-[#FF9500] border border-white/[0.08]">
                {session.customerId}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-[#8E8E93]">
              Independent Aadhaar/DL verification via DigiLocker for each rider
            </p>
          </div>

          {/* Customer Meta Pill */}
          <div className="flex items-center gap-3 self-start sm:self-auto p-3 rounded-xl bg-[#1C1C1E] border border-white/[0.08]">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Customer</span>
              <span className="text-xs font-semibold text-white block">
                {session.customerName || 'Walk-in'}
              </span>
              <span className="text-[11px] font-mono text-[#8E8E93]">
                {session.phoneNumber ? `+91 ${session.phoneNumber}` : 'No phone'}
              </span>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Vehicles</span>
              <span className="text-xs font-bold text-[#FF9500]">
                {session.vehicles.length} Units
              </span>
            </div>
          </div>
        </div>

        {/* Progress Metric Section */}
        <section aria-label="DigiLocker Verification Progress">
          <KycProgressBar
            onSimulateAll={handleSimulateAll}
            isSimulating={isSimulatingAll}
          />
        </section>

        {/* Success All-Verified Confirmation */}
        {allVerified && (
          <div className="p-5 sm:p-6 rounded-2xl bg-[#34C759]/10 border border-[#34C759]/25 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#34C759]/20 text-[#34C759]">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                    All Riders Verified
                  </h3>
                  <p className="text-xs text-[#8E8E93] mt-0.5">
                    Rental agreement authorized for all {total} riders.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#1C1C1E] hover:bg-[#2C2C2E] text-white text-xs font-semibold border border-white/10 transition-colors ios-pressable cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Gate Pass</span>
                </button>
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#34C759] hover:bg-[#34C759]/90 text-white font-semibold text-xs transition-colors ios-pressable cursor-pointer"
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
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
              Rider Cards ({ridersList.length})
            </h2>

            <span className="text-[11px] text-[#8E8E93]">
              Booking: <strong className="text-white font-mono">{session.customerId}</strong>
            </span>
          </div>

          {ridersList.length === 0 ? (
            <div className="bg-[#1C1C1E] rounded-2xl border border-white/[0.08] p-10 text-center space-y-3">
              <p className="text-[#8E8E93] text-xs">No riders found in this rental session.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF9500] text-white text-xs font-medium ios-pressable"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Return to Session Creation</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

      {/* Apple Footer */}
      <footer className="border-t border-white/[0.08] bg-black py-4 px-4 text-center text-xs text-[#636366]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>MEQ WHEELS • Government DigiLocker Compliance Engine</span>
          <span className="font-mono text-[11px]">Booking ID: {session.customerId}</span>
        </div>
      </footer>
    </div>
  );
}
