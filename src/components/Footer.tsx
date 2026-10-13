'use client';

import React from 'react';
import Link from 'next/link';
import { BUSINESS_CONFIG } from '@/config/business';

interface FooterProps {
  bookingId?: string;
}

export function Footer({ bookingId }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/[0.08] bg-black/75 backdrop-blur-2xl text-[#8E8E93] text-xs py-8 px-4 sm:px-6 mt-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Section: Brand + Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
          {/* Brand & Mission Statement */}
          <div className="space-y-1.5 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm tracking-tight">
                MEQ <span className="text-[#FF9500]">WHEELS</span>
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/[0.05] text-[#8E8E93] border border-white/[0.08]">
                Counter Terminal
              </span>
            </div>
            <p className="text-[11px] text-[#8E8E93] leading-relaxed">
              Authorized commercial two-wheeler rental counter verification platform. Integrating digital identity governance via Government DigiLocker.
            </p>
          </div>

          {/* Navigation Links — Apple System Rhythm */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-x-6 gap-y-2.5 text-xs">
            <Link
              href="/"
              className="text-[#8E8E93] hover:text-[#FF9500] transition-colors ios-pressable"
            >
              Counter Home
            </Link>
            <Link
              href="/about"
              className="text-[#8E8E93] hover:text-[#FF9500] transition-colors ios-pressable"
            >
              About
            </Link>
            <Link
              href="/privacy-policy"
              className="text-[#8E8E93] hover:text-[#FF9500] transition-colors ios-pressable"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[#8E8E93] hover:text-[#FF9500] transition-colors ios-pressable"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/contact"
              className="text-[#8E8E93] hover:text-[#FF9500] transition-colors ios-pressable"
            >
              Contact &amp; Grievance
            </Link>
          </nav>
        </div>

        {/* Bottom Metadata & Legal Compliance Disclaimer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#636366]">
          <div>
            <span>© {currentYear} {BUSINESS_CONFIG.brandName}. All rights reserved.</span>
            {bookingId && (
              <span className="ml-2 font-mono text-[#8E8E93]">
                • Active Session: <strong className="text-white font-medium">{bookingId}</strong>
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-[#636366]">
              DigiLocker is a Digital India flagship initiative by NeGD &amp; MeitY
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
