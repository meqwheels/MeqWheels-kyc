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
  AlertTriangle,
  Scale,
  Ban,
  Wallet,
  Clock,
  ExternalLink,
  ChevronRight,
  Phone,
  Mail,
} from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { BorderBeam } from '@/components/ui/border-beam';

export const metadata: Metadata = {
  title: 'Terms & Conditions — MEQ WHEELS',
  description: 'Rental agreement terms, eligibility rules, and driving licence requirements for MEQ WHEELS.',
};

export default function TermsPage() {
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
                Rental Agreement
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Terms & Conditions
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
              colorFrom="#FF9500"
              colorTo="#FF2D55"
              borderWidth={1.5}
            />
            <div className="relative z-10 space-y-3">
            <p>
              These Terms &amp; Conditions govern the reservation, identity verification, vehicle allocation, custody, and rental of two-wheelers provided by <strong>{BUSINESS_CONFIG.brandName}</strong> (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) to the customer (&ldquo;Renter&rdquo;, &ldquo;Customer&rdquo;, &ldquo;you&rdquo;).
            </p>
            <p className="text-xs sm:text-[13px] text-[#8E8E93] leading-relaxed">
              By confirming a booking or completing digital KYC verification, you confirm that you have read, understood, and agreed to these terms as well as our{' '}
              <Link href="/privacy-policy" className="text-[#0A84FF] hover:underline">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/consent" className="text-[#0A84FF] hover:underline">
                DigiLocker Consent Framework
              </Link>
              .
            </p>
            </div>
          </div>
        </section>

        {/* 1. Rider Eligibility */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            1. Rider Eligibility &amp; Driving Licence Mandate
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <div className="p-4 sm:p-5 space-y-1.5">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                Statutory Age Minimum
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                The rider must be at least 18 years of age at the time of vehicle delivery, as required by Indian regional transport regulations.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1.5">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                Active Driving Licence (Section 3, Motor Vehicles Act)
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                Under Section 3 of the Motor Vehicles Act, 1988, every operating rider must possess an original, active, non-expired driving licence authorizing two-wheeler operation (MCWG or MCWOG suited to the allotted vehicle class).
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1.5">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                Learner&rsquo;s Licences (LLR) Excluded
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                Learner&rsquo;s licences are strictly not accepted for commercial self-drive two-wheeler hires under company insurance underwriting policies.
              </p>
            </div>

            <div className="p-4 sm:p-5 space-y-1.5">
              <span className="text-white font-semibold block text-sm sm:text-[15px]">
                Second Rider Entitlement
              </span>
              <p className="text-[#8E8E93] leading-relaxed">
                If a secondary rider is nominated to operate the vehicle, that rider must independently undergo complete identity and licence verification before key turnover.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Mandatory Identity Verification (DigiLocker KYC) */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            2. Mandatory Identity Verification (DigiLocker KYC)
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm leading-relaxed">
            <p className="text-[#E5E5EA]">
              In accordance with commercial vehicle safety norms and anti-fraud protocols:
            </p>
            <div className="space-y-2">
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                <strong className="text-white block">Digital Authentication</strong>
                <span className="text-xs text-[#8E8E93] mt-0.5 block">
                  Every registered rider must authenticate via Government DigiLocker or present physical credentials for counter inspection.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                <strong className="text-white block">Verified Gate Pass Prerequisite</strong>
                <span className="text-xs text-[#8E8E93] mt-0.5 block">
                  Vehicles will not be dispatched until all assigned riders obtain <code>VERIFIED</code> status on the counter terminal.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#2C2C2E]/50 border border-white/[0.04]">
                <strong className="text-white block">Zero Tolerance for Impersonation</strong>
                <span className="text-xs text-[#8E8E93] mt-0.5 block">
                  Furnishing falsified records or impersonating another citizen constitutes a cognizable offense under the IT Act and Bharatiya Nyaya Sanhita (Indian Penal Code).
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Permitted Vehicle Use & Custody */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            3. Permitted Vehicle Use &amp; Rider Conduct
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA] leading-relaxed">
            <p className="text-[#8E8E93]">
              The Renter assumes full custody and legal care of the vehicle throughout the hire duration:
            </p>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                <span><strong>Mandatory Helmet Usage:</strong> The primary rider and pillion passenger must wear ISI-certified helmets at all times as prescribed under Section 129 of the Motor Vehicles Act.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                <span><strong>Strictly No Subletting:</strong> You may not re-hire, sublet, or transfer custody of the vehicle to any unverified third party.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                <span><strong>Prohibited Operations:</strong> Racing, off-road stunts, commercial parcel carriage without permits, transport of contraband, and driving under the influence of alcohol or narcotics (Section 185, MVA) are strictly forbidden.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9500] shrink-0 mt-1.5" />
                <span><strong>Challans &amp; Traffic Penalties:</strong> All electronic challans, toll fees, speeding penalties, and parking citations incurred during the reservation window are the sole responsibility of the Customer.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 4. Grounds for Rental Denial */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            4. Circumstances in Which Rental is Declined
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-2.5 text-xs sm:text-sm text-[#E5E5EA]">
            <p className="text-[#8E8E93]">
              MEQ WHEELS reserves the right to withhold vehicle dispatch or cancel reservation access upon:
            </p>
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2.5 text-xs text-[#E5E5EA]">
                <Ban className="w-4 h-4 text-[#FF453A] shrink-0" />
                <span>Failure to complete mandatory DigiLocker Driving Licence verification.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#E5E5EA]">
                <Ban className="w-4 h-4 text-[#FF453A] shrink-0" />
                <span>Presentation of expired, suspended, or non-entitled driving credentials.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#E5E5EA]">
                <Ban className="w-4 h-4 text-[#FF453A] shrink-0" />
                <span>Physical signs of intoxication, hazardous impairment, or aggressive counter behavior.</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#E5E5EA]">
                <Ban className="w-4 h-4 text-[#FF453A] shrink-0" />
                <span>Name mismatch between customer identification and vehicle booking order.</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Payments, Deposits, & Cancellations */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            5. Security Deposit, Tariffs &amp; Return Policies
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <div className="p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#FF9500] shrink-0 mt-0.5">
                <Wallet className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-sm font-semibold text-white">Refundable Security Deposit</h3>
                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                  Security deposits are processed for refund within 3 to 7 business days following vehicle return and technical inspection, minus any deductions for fuel shortages, physical damage, or pending challans.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#0A84FF] shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-sm font-semibold text-white">Rental Extension &amp; Late Returns</h3>
                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                  Returns delayed beyond the contracted return slot without prior desk authorization are billed according to standard counter hourly extension rates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Accidents, Breakdown & Insurance Liabilities */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            6. Accidents, Breakdown &amp; Damage Liability
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 space-y-3 text-xs sm:text-sm text-[#E5E5EA] leading-relaxed">
            <div className="space-y-2">
              <p>
                <strong>Immediate Notification:</strong> In any accident or breakdown event, the Customer must promptly notify MEQ WHEELS customer desk and regional police authorities (if bodily damage or third-party collision occurs).
              </p>
              <p className="text-xs text-[#8E8E93] pt-1">
                <strong>Third-Party Protection:</strong> Vehicles include statutory third-party liability coverage in compliance with the Motor Vehicles Act. However, damages arising from gross negligence, intoxication, or unauthorized riders are the direct liability of the Customer.
              </p>
            </div>
          </div>
        </section>

        {/* 7. Dispute Resolution & Governing Law */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            7. Governing Law &amp; Counter Assistance
          </h2>
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <div className="p-5 text-[#E5E5EA] leading-relaxed">
              These Terms &amp; Conditions are governed by and construed in accordance with the laws of India. Any claims or disputes arising hereunder shall be subject to the exclusive jurisdiction of the competent courts in the operating city of the rental counter.
            </div>

            <div className="p-4 flex items-center justify-between">
              <span className="text-[#8E8E93]">Customer Support</span>
              <a
                href={`mailto:${BUSINESS_CONFIG.contact.supportEmail}`}
                className="text-[#0A84FF] hover:underline font-medium"
              >
                {BUSINESS_CONFIG.contact.supportEmail}
              </a>
            </div>

            <div className="p-4 flex items-center justify-between">
              <span className="text-[#8E8E93]">Rental Desk Helpline</span>
              <a
                href={`tel:${BUSINESS_CONFIG.contact.rentalDeskHelpline.replace(/\s+/g, '')}`}
                className="text-white hover:text-[#0A84FF] font-mono font-medium"
              >
                {BUSINESS_CONFIG.contact.rentalDeskHelpline}
              </a>
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium">Contact &amp; Grievance Office</span>
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
