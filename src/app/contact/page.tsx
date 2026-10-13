import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BUSINESS_CONFIG } from '@/config/business';
import {
  ChevronLeft,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
  Building2,
} from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';
import { BorderBeam } from '@/components/ui/border-beam';

export const metadata: Metadata = {
  title: 'Contact & Grievance Redressal — MEQ WHEELS',
  description: 'Customer support, rental counter location, and statutory Grievance Redressal Officer contact details for MEQ WHEELS.',
};

export default function ContactPage() {
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
              Support &amp; Statutory Redressal
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
              Contact &amp; Grievance
            </h1>
            <p className="text-sm sm:text-base text-[#8E8E93] leading-relaxed mt-1.5 max-w-2xl">
              Connect directly with our 24/7 rental desk or submit a formal request to our designated Data Protection Grievance Officer.
            </p>
          </div>
        </div>

        {/* Section 1: Rental Counter Desk — iOS Inset Grouped */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            Rental Counter Assistance
          </h2>

          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            {/* Phone Row */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#34C759] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-[15px]">Rental Helpline</h3>
                  <p className="text-xs text-[#8E8E93]">Vehicle collection, roadside assistance &amp; extensions</p>
                </div>
              </div>
              <a
                href={`tel:${BUSINESS_CONFIG.contact.rentalDeskHelpline.replace(/\s+/g, '')}`}
                className="text-white hover:text-[#0A84FF] font-mono font-medium text-sm sm:text-[15px] shrink-0 ios-pressable"
              >
                {BUSINESS_CONFIG.contact.rentalDeskHelpline}
              </a>
            </div>

            {/* Email Row */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#0A84FF] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-[15px]">Customer Support</h3>
                  <p className="text-xs text-[#8E8E93]">Booking inquiries, payment receipts &amp; deposit refunds</p>
                </div>
              </div>
              <a
                href={`mailto:${BUSINESS_CONFIG.contact.supportEmail}`}
                className="text-[#0A84FF] hover:underline font-medium text-sm sm:text-[15px] shrink-0 ios-pressable"
              >
                {BUSINESS_CONFIG.contact.supportEmail}
              </a>
            </div>

            {/* Physical Address Row */}
            <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#FF9500] shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-[15px]">Physical Rental Location</h3>
                  <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mt-0.5">
                    {BUSINESS_CONFIG.registeredAddress.street}, {BUSINESS_CONFIG.registeredAddress.locality},{' '}
                    {BUSINESS_CONFIG.registeredAddress.city}, {BUSINESS_CONFIG.registeredAddress.state} –{' '}
                    {BUSINESS_CONFIG.registeredAddress.pincode}, {BUSINESS_CONFIG.registeredAddress.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Row */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#2C2C2E] text-[#8E8E93] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-[15px]">Desk Operating Hours</h3>
                  <p className="text-xs text-[#8E8E93]">Rental counter availability for vehicle pickup &amp; return</p>
                </div>
              </div>
              <span className="font-semibold text-white text-sm sm:text-[15px] shrink-0">
                {BUSINESS_CONFIG.operatingHours}
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Statutory Data Protection Grievance Officer — iOS Inset Card with Vengeance UI BorderBeam */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            Data Protection Grievance Redressal
          </h2>

          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm relative">
            <BorderBeam
              size={280}
              duration={18}
              colorFrom="#34C759"
              colorTo="#0A84FF"
              borderWidth={1.5}
            />
            {/* Officer Header Card */}
            <div className="p-5 sm:p-6 space-y-3 relative z-10">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#34C759]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34C759]">
                      Designated Grievance Officer
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {BUSINESS_CONFIG.grievanceOfficer.name}
                  </h3>
                  <p className="text-xs text-[#8E8E93]">
                    {BUSINESS_CONFIG.grievanceOfficer.designation} • Digital Personal Data Protection Act, 2023
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-[13px] text-[#E5E5EA] leading-relaxed pt-1">
                Under the <strong>Digital Personal Data Protection Act, 2023</strong> and the <strong>Information Technology Rules, 2021</strong>, data principals may submit written notices regarding consent revocation, access to processed records, data erasure, or identity rectification.
              </p>
            </div>

            {/* Officer Details Grid */}
            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <span className="text-[#8E8E93]">Officer Direct Email</span>
              <a
                href={`mailto:${BUSINESS_CONFIG.grievanceOfficer.email}`}
                className="text-[#0A84FF] hover:underline font-medium text-sm sm:text-[15px] ios-pressable"
              >
                {BUSINESS_CONFIG.grievanceOfficer.email}
              </a>
            </div>

            <div className="p-4 sm:p-5 flex items-center justify-between gap-4">
              <span className="text-[#8E8E93]">Direct Contact Phone</span>
              <a
                href={`tel:${BUSINESS_CONFIG.grievanceOfficer.phone.replace(/\s+/g, '')}`}
                className="text-white hover:text-[#0A84FF] font-mono font-medium text-sm sm:text-[15px] ios-pressable"
              >
                {BUSINESS_CONFIG.grievanceOfficer.phone}
              </a>
            </div>

            <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
              <span className="text-[#8E8E93] shrink-0">Official Postal Address</span>
              <span className="text-right text-[#E5E5EA] text-xs sm:text-sm max-w-sm">
                {BUSINESS_CONFIG.grievanceOfficer.address}
              </span>
            </div>

            {/* Advisory Footnote */}
            <div className="p-4 sm:p-5 bg-white/[0.01] flex items-start gap-3">
              <Info className="w-4 h-4 text-[#8E8E93] shrink-0 mt-0.5" />
              <p className="text-xs text-[#8E8E93] leading-relaxed">
                Please include your registered mobile number and system Booking ID (e.g.{' '}
                <code className="text-white font-mono">MEQ-2026-XXXXX</code>) in all written correspondence to expedite statutory audit verification.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Links Group */}
        <section className="space-y-2">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93] px-1">
            Related Policies
          </h2>

          <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm">
            <Link
              href="/privacy-policy"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium text-white">Privacy Policy &amp; Data Rights</span>
              <ChevronRight className="w-4 h-4 text-[#8E8E93]" />
            </Link>
            <Link
              href="/terms"
              className="flex items-center justify-between p-4 text-[#0A84FF] hover:bg-white/[0.02] transition-colors ios-pressable"
            >
              <span className="font-medium text-white">Terms &amp; Conditions of Rental</span>
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
