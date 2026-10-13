import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BUSINESS_CONFIG } from '@/config/business';
import { ChevronLeft, ShieldCheck, Bike, Zap, CheckCircle2, ChevronRight, MapPin, Clock } from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { BorderBeam } from '@/components/ui/border-beam';

export const metadata: Metadata = {
  title: 'About Us — MEQ WHEELS',
  description: 'About MEQ WHEELS vehicle rental operations and digital KYC compliance framework.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#08080C] text-[#F5F5F7] antialiased relative">
      {/* Animated Rays Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedRays fullPage className="w-full h-full opacity-45" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
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
              Overview
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              About MEQ WHEELS
            </h1>
            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed mt-1.5 max-w-2xl">
              Paperless rental operations with instant, tamper-proof DigiLocker verification for commercial vehicle safety.
            </p>
          </div>
        </div>

        {/* Mission Statement — iOS Inset Hero Card with Vengeance UI BorderBeam */}
        <section aria-labelledby="mission-heading">
          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-sm space-y-3.5 relative overflow-hidden">
            <BorderBeam
              size={280}
              duration={18}
              colorFrom="#FF9500"
              colorTo="#0A84FF"
              borderWidth={1.5}
            />
            <div className="relative z-10 space-y-3.5">
              <h2 id="mission-heading" className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
                Our Mission
              </h2>
              <p className="text-sm sm:text-[15px] text-[#E5E5EA] leading-relaxed">
                At <strong>{BUSINESS_CONFIG.brandName}</strong>, we are modernizing how two-wheeler rentals operate in India.
                Traditional desks often rely on manual photocopies, leading to customer delays and risks of unverified documents.
                We replace this with instant, cryptographically verifiable identity checks using India&rsquo;s <strong>Digital Public Infrastructure</strong>.
              </p>
              <p className="text-sm sm:text-[15px] text-[#8E8E93] leading-relaxed">
                Every rider is authorized directly through Government DigiLocker and the Ministry of Road Transport and Highways (MoRTH) before any vehicle is dispatched.
              </p>
            </div>
          </div>
        </section>

        {/* Core Pillars — iOS Inset Grouped List */}
        <section aria-labelledby="pillars-heading" className="space-y-2.5">
          <h2 id="pillars-heading" className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            Service Standards
          </h2>

          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06]">
            {/* Row 1 */}
            <div className="p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#FF9500] shrink-0 mt-0.5">
                <Bike className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-sm sm:text-[15px] font-semibold text-white">
                  Inspected Fleet
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                  Every scooter and motorcycle undergoes mechanical servicing, brake checks, and safety inspections before key release.
                </p>
              </div>
            </div>

            {/* Row 2 */}
            <div className="p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#34C759] shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-sm sm:text-[15px] font-semibold text-white">
                  100% Lawful Compliance
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                  Strict adherence to Section 3 of the Motor Vehicles Act, 1988. Only licensed riders holding valid two-wheeler entitlements can operate vehicles.
                </p>
              </div>
            </div>

            {/* Row 3 */}
            <div className="p-4 sm:p-5 flex items-start gap-3.5">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#0A84FF] shrink-0 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-sm sm:text-[15px] font-semibold text-white">
                  Instant Digital Release
                </h3>
                <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                  Authenticate in seconds on your mobile phone via OTP. Zero photocopies required, with digital gate pass generated on authorization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Operating Information — iOS Grouped Table Style */}
        <section aria-labelledby="details-heading" className="space-y-2.5">
          <h2 id="details-heading" className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            Rental Counter Details
          </h2>

          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <div className="flex items-center justify-between p-4">
              <span className="text-[#8E8E93]">Operating Brand</span>
              <span className="font-semibold text-white">{BUSINESS_CONFIG.brandName}</span>
            </div>

            <div className="flex items-start justify-between p-4 gap-4">
              <span className="text-[#8E8E93] shrink-0">Counter Location</span>
              <span className="text-right text-white font-medium">
                {BUSINESS_CONFIG.registeredAddress.street}, {BUSINESS_CONFIG.registeredAddress.locality}, {BUSINESS_CONFIG.registeredAddress.city} {BUSINESS_CONFIG.registeredAddress.pincode}
              </span>
            </div>

            <div className="flex items-center justify-between p-4">
              <span className="text-[#8E8E93]">Desk Schedule</span>
              <span className="font-semibold text-white">{BUSINESS_CONFIG.operatingHours}</span>
            </div>

            <Link
              href="/contact"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium">Contact & Grievance Cell</span>
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
