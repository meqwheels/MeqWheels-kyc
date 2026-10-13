'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { KycProgressBar } from '@/components/KycProgressBar';
import { RiderKycCard } from '@/components/RiderKycCard';
import { KycConsentModal } from '@/components/KycConsentModal';
import { useRental } from '@/context/RentalContext';
import {
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Printer,
  Sparkles,
} from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { BorderBeam } from '@/components/ui/border-beam';
import { AnimatedButton } from '@/components/ui/animated-button';

export default function RiderKycPage() {
  const { session, getAllRiders, getVerificationStats, verifyRider, verifyAllRiders } = useRental();
  const [isSimulatingAll, setIsSimulatingAll] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);
  const [consentModalState, setConsentModalState] = useState<{
    isOpen: boolean;
    riderName: string;
    customerId: string;
    vehicleId: string;
    riderId: string;
  }>({
    isOpen: false,
    riderName: '',
    customerId: '',
    vehicleId: '',
    riderId: '',
  });

  const ridersList = getAllRiders();
  const { total, verified, pending, percent } = getVerificationStats();
  const allVerified = total > 0 && verified === total;

  useEffect(() => {
    if (allVerified && !confettiTriggered) {
      setConfettiTriggered(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF9500', '#34C759', '#0A84FF', '#FFFFFF'],
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
    <div className="flex flex-col min-h-screen bg-[#08080C] text-[#F5F5F7] antialiased relative">
      {/* Animated Rays Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedRays fullPage className="w-full h-full opacity-45" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
        {/* iOS-Style Navigation Bar Back Action & Large Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div className="space-y-2">
            <Link
              href="/"
              className="inline-flex items-center gap-0.5 text-sm font-normal text-[#0A84FF] hover:opacity-75 transition-opacity ios-pressable cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 -ml-1 text-[#0A84FF]" />
              <span>Terminal</span>
            </Link>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block">
                Verification Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1 flex items-center gap-3">
                Complete DigiLocker KYC
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-[#FF9500]/15 text-[#FF9500] border border-[#FF9500]/25">
                  Booking {session.customerId}
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#8E8E93] mt-1">
                Each rider must independently complete Aadhaar and Driving Licence verification via DigiLocker.
              </p>
            </div>
          </div>

          {/* Customer Meta Inset Card */}
          <div className="flex items-center gap-3 self-start sm:self-auto p-3.5 rounded-2xl bg-[#1C1C1E] border border-white/[0.08]">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Customer</span>
              <span className="text-xs font-semibold text-white block">
                {session.customerName || 'Walk-in Customer'}
              </span>
              <span className="text-[11px] font-mono text-[#8E8E93]">
                {session.phoneNumber ? `+91 ${session.phoneNumber}` : 'No phone'}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Vehicles</span>
              <span className="text-xs font-bold text-[#FF9500]">
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

        {/* Success All-Verified Banner with Vengeance UI BorderBeam */}
        {allVerified && (
          <div className="bg-[#1C1C1E] border border-[#34C759]/30 rounded-2xl p-5 sm:p-6 shadow-[0_4px_24px_rgba(52,199,89,0.12)] animate-in fade-in duration-200 relative overflow-hidden">
            <BorderBeam
              size={260}
              duration={12}
              colorFrom="#34C759"
              colorTo="#30D158"
              borderWidth={1.5}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#34C759]/15 text-[#34C759] border border-[#34C759]/25 shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    All Riders Verified
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#34C759]/20 text-[#34C759]">
                      Ready for Release
                    </span>
                  </h3>
                  <p className="text-xs text-[#8E8E93] mt-0.5">
                    Rental agreement is authorized. All {total} riders hold authentic DigiLocker credentials.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <AnimatedButton
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-semibold border border-white/[0.12] transition-colors ios-pressable cursor-pointer"
                >
                  <span className="flex items-center justify-center gap-2 text-white">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Gate Pass</span>
                  </span>
                </AnimatedButton>
                <Link
                  href="/"
                  className="flex-1 sm:flex-initial"
                >
                  <AnimatedButton
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#34C759] hover:bg-[#30D158] text-black font-semibold text-xs shadow-sm border border-white/10 transition-all ios-pressable cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2 text-black">
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      <span>New Rental</span>
                    </span>
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Rider Cards Grid */}
        <section aria-label="Individual Rider DigiLocker Cards" className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
              Rider DigiLocker Cards ({ridersList.length})
            </h2>

            <span className="text-xs text-[#8E8E93]">
              Booking ID: <strong className="text-white font-mono">{session.customerId}</strong>
            </span>
          </div>

          {ridersList.length === 0 ? (
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-12 text-center space-y-3">
              <p className="text-[#8E8E93] text-sm">No riders found in this rental session.</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF9500] text-black text-xs font-semibold ios-pressable"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
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
                  onVerify={() => {
                    setConsentModalState({
                      isOpen: true,
                      riderName: item.rider.name,
                      customerId: item.customerId,
                      vehicleId: item.vehicleId,
                      riderId: item.rider.id,
                    });
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {/* Dedicated KYC Consent Step Modal */}
        <KycConsentModal
          isOpen={consentModalState.isOpen}
          onClose={() => setConsentModalState((prev) => ({ ...prev, isOpen: false }))}
          riderName={consentModalState.riderName}
          customerId={consentModalState.customerId}
          bookingId={session.customerId}
          onConsentGranted={async () => {
            await verifyRider(consentModalState.vehicleId, consentModalState.riderId);
          }}
        />
      </main>

        <Footer bookingId={session.customerId} />
      </div>
    </div>
  );
}
