import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BUSINESS_CONFIG } from '@/config/business';
import {
  ChevronLeft,
  ShieldCheck,
  FileCheck,
  Lock,
  RotateCcw,
  Clock,
  ChevronRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { BorderBeam } from '@/components/ui/border-beam';

export const metadata: Metadata = {
  title: 'Consent Policy & DigiLocker Architecture — MEQ WHEELS',
  description: 'Digital KYC consent framework, data handling policies, and consent revocation mechanisms for MEQ WHEELS.',
};

export default function ConsentPage() {
  const lastUpdated = 'October 13, 2026';

  return (
    <div className="flex flex-col min-h-screen bg-[#08080C] text-[#F5F5F7] antialiased relative">
      {/* Animated Rays Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedRays fullPage className="w-full h-full opacity-45" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-7">
        {/* iOS-Style Navigation Bar Back Action */}
        <div className="space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-0.5 text-sm font-normal text-[#0A84FF] hover:opacity-75 transition-opacity ios-pressable"
          >
            <ChevronLeft className="w-4 h-4 -ml-1 text-[#0A84FF]" />
            <span>Terminal</span>
          </Link>

          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block">
              Digital Governance
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              KYC Consent Framework
            </h1>
            <p className="text-xs text-[#8E8E93] mt-1 font-mono">
              Last Updated: {lastUpdated} • Digital Personal Data Protection Act, 2023
            </p>
          </div>
        </div>

        {/* Introduction — iOS Inset Card with Vengeance UI BorderBeam */}
        <section>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-sm text-[#E5E5EA] leading-relaxed relative overflow-hidden">
            <BorderBeam
              size={280}
              duration={20}
              colorFrom="#34C759"
              colorTo="#0A84FF"
              borderWidth={1.5}
            />
            <div className="relative z-10 space-y-3">
              <p>
                Under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>DigiLocker Requester Guidelines</strong> established by the National e-Governance Division (NeGD) and the Ministry of Electronics &amp; Information Technology (MeitY), <strong>{BUSINESS_CONFIG.brandName}</strong> processes personal credentials exclusively on the basis of informed, unconditional, and affirmative customer consent.
              </p>
              <p className="text-xs sm:text-[13px] text-[#8E8E93] leading-relaxed">
                This Consent Framework outlines how your consent is captured, how government documents are requested, and your rights to revoke or inspect stored records.
              </p>
            </div>
          </div>
        </section>

        {/* 1. Purpose Specification */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            1. Purpose Specification
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA] leading-relaxed">
            <p>
              Your consent is requested solely for the following explicit and lawful commercial purposes:
            </p>
            <ul className="space-y-2 pt-1">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] shrink-0 mt-1.5" />
                <span>
                  <strong>Driving Entitlement Verification:</strong> Ensuring compliance with Section 3 of the Motor Vehicles Act, 1988, verifying that each assigned rider holds an active driving licence issued by the Ministry of Road Transport and Highways (MoRTH).
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] shrink-0 mt-1.5" />
                <span>
                  <strong>Identity Validation:</strong> Confirming customer identity via DigiLocker to prevent fraudulent vehicle hire and impersonation.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] shrink-0 mt-1.5" />
                <span>
                  <strong>Gate Pass Generation:</strong> Generating an electronic vehicle dispatch gate pass for counter security.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* 2. Affirmative Opt-In Architecture */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            2. Notice &amp; Affirmative Consent Architecture
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <div className="p-4 sm:p-5 space-y-1">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                No Pre-Ticked Checkboxes
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                In strict adherence to DPDP Act Section 6(1), our verification flow presents explicit, unselected check controls. Consent requires voluntary, intentional affirmative action by the data principal.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                Independent Government Authentication
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                Granting consent in the MEQ WHEELS terminal initiates the request. You are subsequently redirected to the official Government DigiLocker / Meri Pehchaan interface to authenticate with your own government credentials or OTP.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                Audit Trail &amp; Verification Logging
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                Each affirmative consent transaction records an immutable server timestamp, customer ID, booking ID, consent version, and verification audit code for compliance inspection.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Prohibited Data Storage */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            3. Strict Data Minimization &amp; UIDAI Compliance
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA]">
            <p className="text-[#8E8E93]">
              To protect citizen privacy, MEQ WHEELS strictly enforces the following technical boundaries:
            </p>
            <div className="space-y-2 pt-1">
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                <strong className="text-white block">No Raw 12-Digit Aadhaar Storage</strong>
                <span className="text-xs text-[#8E8E93] mt-0.5 block">
                  In compliance with UIDAI regulations, full 12-digit Aadhaar numbers are never collected, logged, or persisted in our databases.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                <strong className="text-white block">No Biometric Data</strong>
                <span className="text-xs text-[#8E8E93] mt-0.5 block">
                  Fingerprints, iris scans, and biometric hashes are never requested or stored.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                <strong className="text-white block">No Citizen DigiLocker Credentials</strong>
                <span className="text-xs text-[#8E8E93] mt-0.5 block">
                  Citizen DigiLocker passwords, PINs, or security questions are never visible to or handled by MEQ WHEELS systems.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Consent Withdrawal & Revocation */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            4. Consent Withdrawal &amp; Revocation
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA] leading-relaxed">
            <p>
              Under Section 6(4) of the DPDP Act, you have the right to withdraw your consent at any time:
            </p>
            <div className="p-3.5 rounded-xl bg-[#2C2C2E]/40 border border-white/[0.04] space-y-2 text-xs text-[#8E8E93]">
              <p>
                <strong>How to Request Revocation:</strong> Submit a written request to our Grievance Officer at{' '}
                <a href={`mailto:${BUSINESS_CONFIG.grievanceOfficer.email}`} className="text-[#0A84FF] underline">
                  {BUSINESS_CONFIG.grievanceOfficer.email}
                </a>{' '}
                specifying your mobile number and Booking ID.
              </p>
              <p>
                <strong>Operational Effect:</strong> If consent is withdrawn prior to or during an active vehicle hire, the rental agreement cannot proceed or will be terminated, as legal vehicle custody requires active driving entitlement verification under Section 3 of the Motor Vehicles Act.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Retention & Purge Policy */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            5. Data Retention &amp; Scheduled Purging
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <div className="flex items-center justify-between p-4">
              <span className="text-[#8E8E93]">Rental Duration</span>
              <span className="font-semibold text-white">Active vehicle hire window</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-[#8E8E93]">Compliance Retention</span>
              <span className="font-semibold text-white">180 Days post-return</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-[#8E8E93]">Post-Audit Action</span>
              <span className="font-medium text-[#34C759]">Permanent cryptographic purge</span>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            Related Documents
          </h2>

          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <Link
              href="/privacy-policy"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium text-white">Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </Link>
            <Link
              href="/terms"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium text-white">Rental Terms &amp; Conditions</span>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium text-white">Contact &amp; Grievance Redressal</span>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </Link>
          </div>
        </section>
      </main>

        <Footer />
      </div>
    </div>
  );
}
