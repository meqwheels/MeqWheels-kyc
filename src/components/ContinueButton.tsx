'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, Shield, CheckCircle2 } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

export function ContinueButton() {
  const router = useRouter();
  const { session, getAllRiders } = useRental();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalVehicles = session.vehicles.length;
  const totalRiders = getAllRiders().length;

  const validateAndProceed = () => {
    setErrorMessage(null);

    // 1. Check customer details
    if (!session.customerId.trim()) {
      setErrorMessage('Please provide a Customer ID.');
      return;
    }
    if (!session.customerName.trim()) {
      setErrorMessage('Please provide the Customer Name.');
      return;
    }
    if (!session.phoneNumber.trim() || session.phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Phone Number for the Customer.');
      return;
    }

    // 2. Check vehicles
    for (let i = 0; i < session.vehicles.length; i++) {
      const v = session.vehicles[i];
      const vNum = i + 1;

      if (!v.vehicleNumber.trim()) {
        setErrorMessage(`Vehicle ${vNum}: Please enter the Vehicle Number.`);
        return;
      }
      if (!v.rider1.name.trim()) {
        setErrorMessage(`Vehicle ${vNum}: Rider 1 Name is required.`);
        return;
      }
      if (!v.rider1.phone.trim() || v.rider1.phone.length < 10) {
        setErrorMessage(`Vehicle ${vNum}: Rider 1 requires a valid 10-digit phone number.`);
        return;
      }

      // Check Rider 2 if toggled
      if (v.hasSecondRider && v.rider2) {
        if (!v.rider2.name.trim()) {
          setErrorMessage(`Vehicle ${vNum}: Rider 2 Name is required since second rider is enabled.`);
          return;
        }
        if (!v.rider2.phone.trim() || v.rider2.phone.length < 10) {
          setErrorMessage(`Vehicle ${vNum}: Rider 2 requires a valid 10-digit phone number.`);
          return;
        }
      }
    }

    // All valid! Proceed to Page 2
    router.push('/kyc');
  };

  return (
    <div className="sticky bottom-0 z-30 w-full bg-[#08080C]/90 backdrop-blur-2xl border-t border-white/[0.08] py-4 px-4 sm:px-6 shadow-2xl">
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
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/[0.05] text-neutral-400 border border-white/[0.05]">
              ID: {session.customerId}
            </span>
          )}
        </div>

        {/* Action Button & Error message */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-xl animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
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
