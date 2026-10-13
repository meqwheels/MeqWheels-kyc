'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Header } from '@/components/Header';
import { KycProgressBar } from '@/components/KycProgressBar';
import { RiderKycCard } from '@/components/RiderKycCard';
import { FlattenedRiderKYC } from '@/types/kyc';
import {
  ChevronLeft,
  CheckCircle2,
  Printer,
  Loader2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface D1KycRecord {
  bookingId: string;
  customerId: string;
  name: string;
  phoneNo: string;
  vehicleNo: string;
  aadhaarNo?: string | null;
  aadhaarFile?: string | null;
  dlNo?: string | null;
  dlFile?: string | null;
  kycStatus: string;
  createdAt?: string;
}

export default function BookingKycPage() {
  const params = useParams();
  const router = useRouter();
  const rawBookingId = params?.bookingId as string;
  const bookingId = rawBookingId ? decodeURIComponent(rawBookingId) : '';

  const [records, setRecords] = useState<D1KycRecord[]>([]);
  const [customerName, setCustomerName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [verifyingIds, setVerifyingIds] = useState<Set<string>>(new Set());
  const [isSimulatingAll, setIsSimulatingAll] = useState(false);
  const [confettiTriggered, setConfettiTriggered] = useState(false);

  // Fetch booking records from Cloudflare D1
  const loadBooking = useCallback(async () => {
    if (!bookingId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/booking/${encodeURIComponent(bookingId)}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to load booking details from database.');
      }

      setRecords(data.records || []);
      setCustomerName(data.customerName || (data.records?.[0]?.name ?? 'Customer'));
      setPhoneNumber(data.phoneNumber || (data.records?.[0]?.phoneNo ?? ''));
    } catch (err: any) {
      console.error('Failed to load booking from D1:', err);
      setError(err.message || 'Error loading booking.');
    } finally {
      setLoading(false);
    }
  }, [bookingId]);

  useEffect(() => {
    loadBooking();
  }, [loadBooking]);

  const total = records.length;
  const verified = records.filter((r) => r.kycStatus === 'VERIFIED').length;
  const pending = total - verified;
  const percent = total > 0 ? Math.round((verified / total) * 100) : 0;
  const allVerified = total > 0 && verified === total;
  const distinctVehicles = Array.from(new Set(records.map((r) => r.vehicleNo))).length;

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

  const handleVerify = async (customerId: string) => {
    setVerifyingIds((prev) => new Set(prev).add(customerId));
    try {
      const res = await fetch('/api/booking/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, kycStatus: 'VERIFIED' }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Verification update failed.');
      }

      setRecords((prev) =>
        prev.map((r) =>
          r.customerId === customerId ? { ...r, kycStatus: 'VERIFIED' } : r
        )
      );
    } catch (err) {
      console.error('Error verifying customer:', err);
    } finally {
      setVerifyingIds((prev) => {
        const next = new Set(prev);
        next.delete(customerId);
        return next;
      });
    }
  };

  const handleReset = async (customerId: string) => {
    try {
      const res = await fetch('/api/booking/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId, kycStatus: 'PENDING' }),
      });
      const data = await res.json();

      if (data.success) {
        setRecords((prev) =>
          prev.map((r) =>
            r.customerId === customerId ? { ...r, kycStatus: 'PENDING' } : r
          )
        );
      }
    } catch (err) {
      console.error('Error resetting customer verification:', err);
    }
  };

  const handleSimulateAll = async () => {
    setIsSimulatingAll(true);
    const pendingRecords = records.filter((r) => r.kycStatus !== 'VERIFIED');

    try {
      for (const rec of pendingRecords) {
        await fetch('/api/booking/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customerId: rec.customerId, kycStatus: 'VERIFIED' }),
        });
      }

      setRecords((prev) =>
        prev.map((r) => ({ ...r, kycStatus: 'VERIFIED' }))
      );
    } catch (err) {
      console.error('Error in simulate verify all:', err);
    } finally {
      setIsSimulatingAll(false);
    }
  };

  const ridersList: FlattenedRiderKYC[] = records.map((rec, index) => ({
    uniqueKey: rec.customerId,
    vehicleId: rec.vehicleNo,
    vehicleNumber: rec.vehicleNo,
    rider: {
      id: rec.customerId,
      riderNumber: 1,
      name: rec.name,
      phone: rec.phoneNo,
      kycStatus: rec.kycStatus === 'VERIFIED' ? 'verified' : (verifyingIds.has(rec.customerId) ? 'verifying' : 'pending'),
      verifiedAt: rec.kycStatus === 'VERIFIED' ? 'Via DigiLocker' : undefined,
      referenceId: rec.kycStatus === 'VERIFIED' ? `DL-${rec.customerId.slice(-6)}` : undefined,
    },
    globalRiderNumber: index + 1,
    customerName: rec.name,
    customerId: rec.customerId,
    bookingId: rec.bookingId,
    customerSpecificId: rec.customerId,
  }));

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
                {bookingId}
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
                {customerName || 'Walk-in'}
              </span>
              <span className="text-[11px] font-mono text-[#8E8E93]">
                {phoneNumber ? `+91 ${phoneNumber}` : 'No phone'}
              </span>
            </div>
            <div className="w-px h-7 bg-white/10" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Vehicles</span>
              <span className="text-xs font-bold text-[#FF9500]">
                {distinctVehicles || 1} Units
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-[#1C1C1E] rounded-2xl border border-white/[0.08] p-12 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-7 h-7 text-[#FF9500] animate-spin" />
            <p className="text-[#8E8E93] text-xs">Loading KYC records...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="bg-[#1C1C1E] rounded-2xl border border-[#FF3B30]/30 p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#FF3B30]/15 text-[#FF3B30] mb-1">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h2 className="text-base font-semibold text-white">Could Not Load Booking</h2>
            <p className="text-[#8E8E93] text-xs max-w-md mx-auto">{error}</p>
            <div className="pt-2 flex justify-center gap-2.5">
              <button
                type="button"
                onClick={loadBooking}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#2C2C2E] hover:bg-[#3A3A3C] text-white text-xs font-medium transition-colors ios-pressable cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF9500] text-white text-xs font-medium ios-pressable cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>New Session</span>
              </Link>
            </div>
          </div>
        )}

        {/* Normal Content State */}
        {!loading && !error && (
          <>
            {/* Progress Section */}
            <section aria-label="DigiLocker Verification Progress">
              <KycProgressBar
                onSimulateAll={handleSimulateAll}
                isSimulating={isSimulatingAll}
                stats={{ total, verified, pending, percent }}
                customerName={customerName}
                bookingId={bookingId}
              />
            </section>

            {/* Success Confirmation Card */}
            {allVerified && (
              <div className="p-5 sm:p-6 rounded-2xl bg-[#34C759]/10 border border-[#34C759]/25 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#34C759]/20 text-[#34C759]">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                        All Riders Verified Successfully
                      </h3>
                      <p className="text-xs text-[#8E8E93] mt-0.5">
                        Rental agreement authorized by DigiLocker for all {total} riders.
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
                  Booking: <strong className="text-white font-mono">{bookingId}</strong>
                </span>
              </div>

              {ridersList.length === 0 ? (
                <div className="bg-[#1C1C1E] rounded-2xl border border-white/[0.08] p-10 text-center space-y-3">
                  <p className="text-[#8E8E93] text-xs">No riders found for booking {bookingId}.</p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF9500] text-white text-xs font-medium ios-pressable cursor-pointer"
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
                      onVerify={handleVerify}
                      onReset={handleReset}
                      isVerifying={verifyingIds.has(item.customerId)}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Footer info bar */}
      <footer className="border-t border-white/[0.08] bg-black py-4 px-4 text-center text-xs text-[#636366]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <span>MEQ WHEELS • Government DigiLocker Compliance Engine</span>
          <span className="font-mono text-[11px]">Booking ID: {bookingId}</span>
        </div>
      </footer>
    </div>
  );
}
