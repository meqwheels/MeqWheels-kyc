'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, Shield, Sparkles } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

export function ContinueButton() {
  const router = useRouter();
  const { session, getAllRiders } = useRental();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Prefetch Page 2 on mount for instantaneous navigation
  useEffect(() => {
    router.prefetch('/kyc');
  }, [router]);

  const totalVehicles = session.vehicles.length;
  const totalRiders = getAllRiders().length;

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const validateAndProceed = () => {
    setErrorMessage(null);

    // 1. Check booking ID number
    const currentYear = new Date().getFullYear();
    const prefix = `MEQ-${currentYear}-`;
    const suffix = session.customerId.startsWith(prefix)
      ? session.customerId.slice(prefix.length).trim()
      : session.customerId.replace(/^MEQ-\d{4}-/i, '').trim();

    if (!suffix) {
      setErrorMessage('Please enter the Booking ID number.');
      scrollToElement('customerIdSuffix');
      return;
    }

    // 2. Check customer details
    if (!session.customerName || !session.customerName.trim()) {
      setErrorMessage('Please enter the Customer Name to continue.');
      scrollToElement('customerName');
      return;
    }

    if (!session.phoneNumber || !session.phoneNumber.trim() || session.phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Customer Phone Number.');
      scrollToElement('phoneNumber');
      return;
    }

    // 3. Check vehicles and riders
    let cumulativeRiders = 0;
    for (let i = 0; i < session.vehicles.length; i++) {
      const v = session.vehicles[i];
      const vNum = i + 1;
      const r1Num = cumulativeRiders + 1;
      const r2Num = cumulativeRiders + 2;

      if (!v.vehicleNumber || !v.vehicleNumber.trim()) {
        setErrorMessage(`Vehicle ${vNum}: Please enter the Vehicle Registration Number.`);
        scrollToElement(`veh-num-${v.id}`);
        return;
      }

      if (!v.rider1.name || !v.rider1.name.trim()) {
        setErrorMessage(`Vehicle ${vNum}: Rider ${r1Num} Name is required.`);
        scrollToElement(`r1-name-${v.id}`);
        return;
      }

      if (!v.rider1.phone || !v.rider1.phone.trim() || v.rider1.phone.length < 10) {
        setErrorMessage(`Vehicle ${vNum}: Rider ${r1Num} requires a valid 10-digit phone number.`);
        scrollToElement(`r1-phone-${v.id}`);
        return;
      }

      cumulativeRiders += 1;

      // Check Rider 2 if toggled
      if (v.hasSecondRider && v.rider2) {
        if (!v.rider2.name || !v.rider2.name.trim()) {
          setErrorMessage(`Vehicle ${vNum}: Rider ${r2Num} Name is required since second rider is enabled.`);
          scrollToElement(`r2-name-${v.id}`);
          return;
        }
        if (!v.rider2.phone || !v.rider2.phone.trim() || v.rider2.phone.length < 10) {
          setErrorMessage(`Vehicle ${vNum}: Rider ${r2Num} requires a valid 10-digit phone number.`);
          scrollToElement(`r2-phone-${v.id}`);
          return;
        }
        cumulativeRiders += 1;
      }
    }

    // All valid! Execute guaranteed transition to Page 2
    try {
      router.push('/kyc');
    } catch {
      window.location.href = '/kyc';
    }
  };

  return (
    <div className="sticky bottom-0 z-30 w-full bg-[#08080C]/95 backdrop-blur-2xl border-t border-white/[0.08] py-4 px-4 sm:px-6 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Summary Info */}
        <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-300 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">
              {totalVehicles} {totalVehicles === 1 ? 'Vehicle' : 'Vehicles'}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="font-semibold text-orange-400">
              {totalRiders} {totalRiders === 1 ? 'Rider' : 'Riders'} to Verify
            </span>
          </div>

          {session.customerId && (
            <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-white/[0.05] text-neutral-300 border border-white/[0.08]">
              Booking: {session.customerId}
            </span>
          )}
        </div>

        {/* Action Button & Error message */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {errorMessage && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-950/40 border border-red-500/40 px-3.5 py-2 rounded-xl animate-in fade-in shadow-lg">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="button"
            onClick={validateAndProceed}
            className="w-full sm:w-auto min-w-[240px] group relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-400 hover:via-orange-500 hover:to-amber-400 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Shield className="w-4 h-4 text-white" />
            <span>Start DigiLocker KYC</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}
