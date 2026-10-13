'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  X,
  ExternalLink,
  Lock,
  Loader2,
  Check,
  AlertCircle,
  FileCheck,
  Clock,
  Info,
} from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';
import { AnimatedButton } from '@/components/ui/animated-button';

interface KycConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConsentGranted: () => Promise<void> | void;
  riderName: string;
  customerId: string;
  bookingId: string;
}

export function KycConsentModal({
  isOpen,
  onClose,
  onConsentGranted,
  riderName,
  customerId,
  bookingId,
}: KycConsentModalProps) {
  const [agreedPurpose, setAgreedPurpose] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDecline = async () => {
    try {
      await fetch('/api/kyc/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          customerId,
          riderName,
          agreed: false,
          purpose: 'Identity and Driving Licence verification for two-wheeler rental',
          consentVersion: 'v1.0-2026',
        }),
      });
    } catch {
      // Non-blocking
    }
    onClose();
  };

  const handleConfirm = async () => {
    if (!agreedPurpose || !agreedTerms) return;

    try {
      setIsSubmitting(true);
      setError(null);

      const res = await fetch('/api/kyc/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          customerId,
          riderName,
          agreed: true,
          purpose: 'Identity and Driving Licence verification for two-wheeler rental',
          consentVersion: 'v1.0-2026',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to record consent on server.');
      }

      await onConsentGranted();
      onClose();
    } catch (err: any) {
      console.error('Consent recording error:', err);
      setError(err.message || 'Unable to register consent. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-2xl transition-all duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
    >
      {/* iOS System Modal Container with Vengeance UI BorderBeam */}
      <div className="w-full max-w-[480px] bg-[#1C1C1E] border border-white/[0.12] rounded-[28px] shadow-[0_24px_64px_rgba(0,0,0,0.85)] flex flex-col max-h-[90vh] overflow-hidden text-[#F5F5F7] animate-in zoom-in-95 duration-200 relative">
        <BorderBeam
          size={280}
          duration={14}
          colorFrom="#0A84FF"
          colorTo="#34C759"
          borderWidth={1.5}
        />
        
        {/* iOS Drag Handle Pill (Mobile affordance) */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden relative z-10">
          <div className="w-9 h-1 rounded-full bg-white/20" />
        </div>

        {/* Modal Header */}
        <div className="relative z-10 px-6 pt-5 pb-4 border-b border-white/[0.06]">
          {/* Circular Close Button */}
          <button
            type="button"
            onClick={handleDecline}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#2C2C2E] text-[#8E8E93] hover:text-white flex items-center justify-center transition-colors ios-pressable cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-3.5 pr-8">
            <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-[#2C2C2E] text-[#34C759] shrink-0 border border-white/[0.06]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="consent-title" className="text-lg font-bold text-white tracking-tight leading-snug">
                KYC Verification Consent
              </h2>
              <p className="text-xs text-[#8E8E93] mt-0.5">
                Rider: <span className="text-white font-medium">{riderName}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Information Body */}
        <div className="p-6 space-y-4 overflow-y-auto text-xs leading-relaxed">
          {/* iOS Inset Grouped Details List */}
          <div className="bg-[#2C2C2E]/50 border border-white/[0.06] rounded-2xl divide-y divide-white/[0.06] overflow-hidden">
            {/* Row 1: Purpose */}
            <div className="p-3.5 flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3A3A3C] text-[#0A84FF] shrink-0 mt-0.5">
                <FileCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white block">
                  1. Statutory Purpose (MVA Section 3)
                </span>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                  Required by Section 3 of the Motor Vehicles Act, 1988 to verify active two-wheeler entitlement before key release.
                </p>
              </div>
            </div>

            {/* Row 2: Data Requested */}
            <div className="p-3.5 flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3A3A3C] text-[#34C759] shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white block">
                  2. Requested Documents &amp; Privacy
                </span>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                  MoRTH Driving Licence and UIDAI identity check via DigiLocker. Full 12-digit Aadhaar numbers and biometrics are never stored.
                </p>
              </div>
            </div>

            {/* Row 3: Retention */}
            <div className="p-3.5 flex items-start gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#3A3A3C] text-[#FF9500] shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-white block">
                  3. 180-Day Compliance Retention
                </span>
                <p className="text-[11px] text-[#8E8E93] leading-relaxed">
                  Retained for the hire duration and statutory audit window under DPDP Act, 2023, then systematically purged.
                </p>
              </div>
            </div>
          </div>

          {/* Government Precedence Callout */}
          <div className="p-3 rounded-xl bg-[#2C2C2E]/30 border border-white/[0.04] text-[11px] text-[#8E8E93] flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#0A84FF] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Granting consent initiates this request. You will independently authenticate on Government DigiLocker / Meri Pehchaan servers using your credentials or OTP.
            </p>
          </div>

          {/* iOS Selection Controls (Checkboxes) */}
          <div className="space-y-2.5 pt-1">
            {/* Purpose Check Control */}
            <div
              onClick={() => setAgreedPurpose(!agreedPurpose)}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2C2C2E]/40 hover:bg-[#2C2C2E]/70 border border-white/[0.06] cursor-pointer transition-colors select-none ios-pressable"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                  agreedPurpose
                    ? 'bg-[#0A84FF] border-[#0A84FF] text-white'
                    : 'bg-transparent border-white/30'
                }`}
              >
                {agreedPurpose && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs text-[#E5E5EA] leading-snug">
                I grant affirmative consent to MEQ WHEELS to verify my Driving Licence and identity records via DigiLocker for this rental booking.
              </span>
            </div>

            {/* Terms & Privacy Check Control */}
            <div
              onClick={() => setAgreedTerms(!agreedTerms)}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2C2C2E]/40 hover:bg-[#2C2C2E]/70 border border-white/[0.06] cursor-pointer transition-colors select-none ios-pressable"
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors border ${
                  agreedTerms
                    ? 'bg-[#0A84FF] border-[#0A84FF] text-white'
                    : 'bg-transparent border-white/30'
                }`}
              >
                {agreedTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>
              <span className="text-xs text-[#E5E5EA] leading-snug">
                I have reviewed and agree to the{' '}
                <Link
                  href="/privacy-policy"
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#0A84FF] hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  Privacy Policy <ExternalLink className="w-2.5 h-2.5" />
                </Link>{' '}
                and{' '}
                <Link
                  href="/terms"
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#0A84FF] hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  Terms &amp; Conditions <ExternalLink className="w-2.5 h-2.5" />
                </Link>
                .
              </span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-[#FF453A]/10 border border-[#FF453A]/30 text-[#FF453A] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Modal Action Bar — Apple HIG System Buttons */}
        <div className="p-5 border-t border-white/[0.06] bg-[#1C1C1E] flex items-center justify-between gap-3 relative z-10">
          <button
            type="button"
            onClick={handleDecline}
            disabled={isSubmitting}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8E8E93] hover:text-white transition-colors ios-pressable cursor-pointer"
          >
            Cancel
          </button>

          <AnimatedButton
            type="button"
            onClick={handleConfirm}
            disabled={!agreedPurpose || !agreedTerms || isSubmitting}
            className="px-6 py-2.5 rounded-xl bg-[#FF9500] hover:bg-[#FF9F0A] text-black font-semibold text-xs tracking-tight shadow-sm border border-white/10 ios-pressable cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[42px]"
          >
            <span className="flex items-center justify-center gap-2 text-black">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                  <span>Recording Consent...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-black" />
                  <span>Consent &amp; Proceed</span>
                </>
              )}
            </span>
          </AnimatedButton>
        </div>
      </div>
    </div>
  );
}
