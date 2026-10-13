import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BUSINESS_CONFIG } from '@/config/business';
import {
  ChevronLeft,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Lock,
  FileCheck,
  Eye,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { BorderBeam } from '@/components/ui/border-beam';

export const metadata: Metadata = {
  title: 'Privacy Policy — MEQ WHEELS',
  description: 'Digital Personal Data Protection and KYC Privacy Policy for MEQ WHEELS vehicle rentals.',
};

export default function PrivacyPolicyPage() {
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
                Legal & Data Protection
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Privacy Policy
              </h1>
              <p className="text-xs text-[#8E8E93] mt-1 font-mono">
                Last Updated: {lastUpdated}
              </p>
            </div>
          </div>

          {/* Introduction — iOS Inset Card with Vengeance UI BorderBeam */}
          <section>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-sm text-[#E5E5EA] leading-relaxed relative overflow-hidden">
              <BorderBeam
                size={280}
                duration={20}
                colorFrom="#0A84FF"
                colorTo="#34C759"
                borderWidth={1.5}
              />
              <div className="relative z-10 space-y-3">
                <p>
                  Welcome to <strong>{BUSINESS_CONFIG.brandName}</strong>. We provide commercial two-wheeler rental services in India. Because our operations involve issuing motor vehicles on public roads, we collect and process personal data to verify customer identity, driving entitlement, and rental agreement execution.
                </p>
                <p className="text-xs sm:text-[13px] text-[#8E8E93] leading-relaxed">
                  This Privacy Policy details our practices under the <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong>, the <strong>Information Technology Act, 2000</strong>, and the <strong>SPDI Rules, 2011</strong>.
                </p>
              </div>
            </div>
          </section>

          {/* 1. Identity of Data Fiduciary */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              1. Data Fiduciary Identity
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
              <div className="flex items-center justify-between p-4">
                <span className="text-[#8E8E93]">Business Brand</span>
                <span className="font-semibold text-white">{BUSINESS_CONFIG.brandName}</span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-[#8E8E93]">Enterprise Status</span>
                <span className="font-medium text-white">{BUSINESS_CONFIG.registrationNumber}</span>
              </div>
              <div className="flex items-start justify-between p-4 gap-4">
                <span className="text-[#8E8E93] shrink-0">Operating Address</span>
                <span className="text-right text-white font-medium">
                  {BUSINESS_CONFIG.registeredAddress.street}, {BUSINESS_CONFIG.registeredAddress.locality}, {BUSINESS_CONFIG.registeredAddress.city}, {BUSINESS_CONFIG.registeredAddress.state} – {BUSINESS_CONFIG.registeredAddress.pincode}
                </span>
              </div>
              <div className="flex items-center justify-between p-4">
                <span className="text-[#8E8E93]">General Support</span>
                <div className="flex items-center gap-3">
                  <a href={`mailto:${BUSINESS_CONFIG.contact.supportEmail}`} className="text-[#0A84FF] hover:underline">
                    {BUSINESS_CONFIG.contact.supportEmail}
                  </a>
                  <span className="text-white/20">•</span>
                  <a href={`tel:${BUSINESS_CONFIG.contact.supportPhone.replace(/\s+/g, '')}`} className="text-[#0A84FF] hover:underline font-mono">
                    {BUSINESS_CONFIG.contact.supportPhone}
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Categories of Data Collected */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              2. Personal Information Collected
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm">
              <p className="text-[#8E8E93]">We collect only data necessary for vehicle rental verification and safety:</p>
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                  <strong className="text-white block text-xs sm:text-[13px]">A. Customer Contact</strong>
                  <span className="text-xs text-[#8E8E93] mt-0.5 block">
                    Customer Name, 10-digit mobile phone number, and system Booking ID (e.g. <code>MEQ-2026-XXXXX</code>).
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                  <strong className="text-white block text-xs sm:text-[13px]">B. Allocated Vehicle Information</strong>
                  <span className="text-xs text-[#8E8E93] mt-0.5 block">
                    Vehicle registration number (license plate) linked to the customer reservation.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                  <strong className="text-white block text-xs sm:text-[13px]">C. Rider Information & Driving Licence</strong>
                  <span className="text-xs text-[#8E8E93] mt-0.5 block">
                    Names and phone numbers for Primary Rider and optional Second Rider; Driving Licence digital metadata issued by MoRTH.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                  <strong className="text-white block text-xs sm:text-[13px]">D. Consent & Audit Verification Logs</strong>
                  <span className="text-xs text-[#8E8E93] mt-0.5 block">
                    Server-side consent timestamps, affirmative opt-in records, audit reference codes (<code>DL-XXXXXX</code>), and verification status (<code>PENDING</code> or <code>VERIFIED</code>).
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Purpose of Processing */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              3. Purposes of Processing
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA] leading-relaxed">
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                  <span><strong>Statutory Compliance:</strong> Enforcing Section 3 of the Motor Vehicles Act, 1988, ensuring all active riders hold an authentic driving licence.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                  <span><strong>Agreement Execution:</strong> Establishing rider identity and formal vehicle custody during the hire window.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                  <span><strong>Public Safety & Traffic Law:</strong> Assisting transport enforcement authorities in cases of accidents, citations, or emergency assistance.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* 4. DigiLocker KYC Verification & UIDAI Policy */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              4. DigiLocker KYC Framework & Aadhaar Protection
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm leading-relaxed">
              <p className="text-[#E5E5EA]">
                MEQ WHEELS uses the <strong>Government DigiLocker / Meri Pehchaan Requester Framework</strong> to verify credentials digitally:
              </p>
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/40 border border-white/[0.04] space-y-1.5 text-xs text-[#8E8E93]">
                <p><strong>Consent Precedence:</strong> Our affirmative consent modal is presented prior to document access. Citizens authenticate directly on Government servers via OTP or security PIN.</p>
                <p><strong>Zero Password Storage:</strong> MEQ WHEELS never receives or stores your DigiLocker PIN or credentials.</p>
                <p><strong>UIDAI Compliance:</strong> In strict adherence to UIDAI regulations, <em>MEQ WHEELS does not store raw 12-digit Aadhaar numbers or biometric files</em>. Only masked references and status indicators are retained.</p>
              </div>
            </div>
          </section>

          {/* 5. Processors & Retention */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              5. Processors & Retention Window
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA] leading-relaxed">
              <p>
                <strong>Data Processors:</strong> Cloudflare Inc. (database infrastructure) and NeGD / MeitY (DigiLocker gateway). We do not sell, rent, or share personal data with third-party advertisers.
              </p>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-[#8E8E93] space-y-1">
                <p><strong>Active Rental Duration:</strong> Records are retained for the duration of the hire period.</p>
                <p><strong>Statutory Audit Window:</strong> Retained for <strong>180 days</strong> post-vehicle return for transport regulation compliance, after which data is systematically purged.</p>
              </div>
            </div>
          </section>

          {/* 6. Data Principal Rights */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              6. Data Principal Rights (DPDP Act, 2023)
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-2.5 text-xs sm:text-sm text-[#E5E5EA]">
              <p className="text-xs text-[#8E8E93]">Under Indian data protection law, you have the following rights:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#2C2C2E]/40 border border-white/[0.04]">
                  <strong className="text-white block">Right to Access</strong>
                  <span className="text-[#8E8E93] mt-0.5 block">Summary of processed personal data and fiduciary details.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#2C2C2E]/40 border border-white/[0.04]">
                  <strong className="text-white block">Right to Correction & Erasure</strong>
                  <span className="text-[#8E8E93] mt-0.5 block">Rectification of inaccuracies or erasure post-retention.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#2C2C2E]/40 border border-white/[0.04]">
                  <strong className="text-white block">Right to Grievance Redressal</strong>
                  <span className="text-[#8E8E93] mt-0.5 block">Timely resolution of complaints via our Grievance Officer.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#2C2C2E]/40 border border-white/[0.04]">
                  <strong className="text-white block">Right to Nominate</strong>
                  <span className="text-[#8E8E93] mt-0.5 block">Nominate a representative in case of death or incapacity.</span>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Grievance Redressal Officer */}
          <section className="space-y-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
              7. Grievance Redressal Officer
            </h2>
            <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm">
              <div>
                <h3 className="font-semibold text-white">{BUSINESS_CONFIG.grievanceOfficer.name}</h3>
                <p className="text-xs text-[#34C759] mt-0.5">{BUSINESS_CONFIG.grievanceOfficer.designation}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.06] text-xs">
                <div>
                  <span className="text-[#8E8E93] block">Direct Email:</span>
                  <a href={`mailto:${BUSINESS_CONFIG.grievanceOfficer.email}`} className="text-[#0A84FF] hover:underline font-medium">
                    {BUSINESS_CONFIG.grievanceOfficer.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#8E8E93] block">Contact Phone:</span>
                  <a href={`tel:${BUSINESS_CONFIG.grievanceOfficer.phone.replace(/\s+/g, '')}`} className="text-white font-mono hover:text-[#0A84FF]">
                    {BUSINESS_CONFIG.grievanceOfficer.phone}
                  </a>
                </div>
              </div>
              <div className="text-xs pt-2 border-t border-white/[0.06] text-[#8E8E93]">
                <span>Official Address: </span>
                <span className="text-white font-medium">{BUSINESS_CONFIG.grievanceOfficer.address}</span>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
