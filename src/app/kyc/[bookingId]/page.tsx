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
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Printer,
  Loader2,
  AlertCircle,
  RotateCcw,
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

  // Compute stats
  const total = records.length;
  const verified = records.filter((r) => r.kycStatus === 'VERIFIED').length;
  const pending = total - verified;
  const percent = total > 0 ? Math.round((verified / total) * 100) : 0;
  const allVerified = total > 0 && verified === total;

  // Distinct vehicles count
  const distinctVehicles = Array.from(new Set(records.map((r) => r.vehicleNo))).length;

  // Confetti effect on all verified
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

  // Single rider KYC verification via D1
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

      // Update in state
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

  // Reset rider verification back to PENDING in D1
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

  // Simulate Verify All in D1
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

      // Update state
      setRecords((prev) =>
        prev.map((r) => ({ ...r, kycStatus: 'VERIFIED' }))
      );
    } catch (err) {
      console.error('Error in simulate verify all:', err);
    } finally {
      setIsSimulatingAll(false);
    }
  };

  // Adapt D1 records to FlattenedRiderKYC format
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
                Booking: {bookingId}
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
                {customerName || 'Walk-in Customer'}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                {phoneNumber ? `+91 ${phoneNumber}` : 'No phone'}
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Vehicles</span>
              <span className="text-xs font-bold text-orange-400">
                {distinctVehicles || 1} Units
              </span>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="glass-panel p-16 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            <p className="text-neutral-400 text-sm">Loading KYC records from Cloudflare D1...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="glass-panel p-8 border-red-500/40 bg-red-950/20 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20 text-red-400 mb-1">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Could Not Load Booking</h2>
            <p className="text-neutral-400 text-sm max-w-md mx-auto">{error}</p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={loadBooking}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-white text-xs font-semibold border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>New Session</span>
              </Link>
            </div>
          </div>
        )}

        {/* Normal Content State */}
        {!loading && !error && (
          <>
            {/* Progress Indicator Section */}
            <section aria-label="DigiLocker Verification Progress">
              <KycProgressBar
                onSimulateAll={handleSimulateAll}
                isSimulating={isSimulatingAll}
                stats={{ total, verified, pending, percent }}
                customerName={customerName}
                bookingId={bookingId}
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
                        Rental agreement is authorized in Cloudflare D1. All {total} riders have valid DigiLocker credentials.
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
                  Booking ID: <strong className="text-orange-400">{bookingId}</strong>
                </span>
              </div>

              {ridersList.length === 0 ? (
                <div className="glass-panel p-12 text-center space-y-3">
                  <p className="text-neutral-400 text-sm">No riders found for booking {bookingId}.</p>
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
      <footer className="border-t border-white/[0.06] bg-black/40 py-4 px-4 text-center text-xs text-neutral-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MEQ WHEELS Counter Terminal • Government DigiLocker Compliance Engine (Cloudflare D1)</span>
          <span className="font-mono text-[11px] text-neutral-600">Booking ID: {bookingId}</span>
        </div>
      </footer>
    </div>
  );
}
