'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, AlertCircle, Shield, Loader2 } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

export function ContinueButton() {
  const router = useRouter();
  const { session, getAllRiders, updateCustomer } = useRental();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const totalVehicles = session.vehicles.length;
  const totalRiders = getAllRiders().length;

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    }
  };

  const validateAndProceed = async () => {
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

    // 4. Save to Cloudflare D1 Backend
    setIsSaving(true);
    try {
      const payload = {
        customerName: session.customerName,
        phone: session.phoneNumber,
        bookingId: session.customerId,
        vehicles: session.vehicles.map((v) => ({
          vehicleNo: v.vehicleNumber,
          riders: [
            { name: v.rider1.name, phone: v.rider1.phone },
            ...(v.hasSecondRider && v.rider2 ? [{ name: v.rider2.name, phone: v.rider2.phone }] : []),
          ],
        })),
      };

      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save booking to database.');
      }

      if (data.bookingId && data.bookingId !== session.customerId) {
        updateCustomer('customerId', data.bookingId);
      }

      router.push(`/kyc/${data.bookingId}`);
    } catch (err: any) {
      console.error('Error saving to D1:', err);
      setErrorMessage(err.message || 'Could not connect to database.');
      setIsSaving(false);
    }
  };

  return (
    <div className="sticky bottom-0 z-30 w-full bg-black/80 backdrop-blur-2xl border-t border-white/[0.08] py-3.5 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Summary Info */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-[#8E8E93] w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">
              {totalVehicles} {totalVehicles === 1 ? 'Vehicle' : 'Vehicles'}
            </span>
            <span className="text-[#636366]">•</span>
            <span className="font-medium text-[#FF9500]">
              {totalRiders} {totalRiders === 1 ? 'Rider' : 'Riders'} to Verify
            </span>
          </div>

          {session.customerId && (
            <span className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-[#1C1C1E] text-[#8E8E93] border border-white/[0.06]">
              {session.customerId}
            </span>
          )}
        </div>

        {/* Action Button & Error message */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
          {errorMessage && (
            <div className="flex items-center gap-2 text-xs font-medium text-[#FF3B30] bg-[#FF3B30]/12 border border-[#FF3B30]/25 px-3 py-2 rounded-xl animate-in fade-in">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="button"
            disabled={isSaving}
            onClick={validateAndProceed}
            className="w-full sm:w-auto min-w-[220px] group flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF9500] hover:bg-[#FF9500]/90 text-white font-semibold text-sm tracking-wide disabled:opacity-60 disabled:cursor-wait ios-pressable cursor-pointer shadow-sm"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Saving Booking...</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4" />
                <span>Start DigiLocker KYC</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
