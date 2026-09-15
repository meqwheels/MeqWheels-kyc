'use client';

import React from 'react';
import { User, Phone, Hash } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

export function CustomerForm() {
  const { session, updateCustomer } = useRental();
  const currentYear = new Date().getFullYear();

  return (
    <div className="glass-panel p-6 sm:p-7 relative overflow-hidden transition-all duration-300 hover:border-white/15">
      {/* Subtle top accent gradient */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Customer Information</h2>
            <p className="text-xs text-neutral-400">Primary booking contact linked to all rented vehicles</p>
          </div>
        </div>

        <span className="self-start sm:self-auto text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] text-neutral-400 border border-white/[0.06]">
          Step 1 of 2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Booking ID */}
        <div className="space-y-2">
          <label htmlFor="customerId" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-orange-400" />
            Booking ID <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <input
              id="customerId"
              type="text"
              value={session.customerId}
              onChange={(e) => updateCustomer('customerId', e.target.value.toUpperCase())}
              placeholder={`MEQ-${currentYear}-001`}
              className="w-full glass-input px-4 py-3 text-sm font-mono tracking-wide placeholder:text-neutral-600 focus:text-white"
              required
            />
          </div>
          <p className="text-[11px] text-neutral-500">Fixed format: MEQ-{currentYear}-ID</p>
        </div>

        {/* Customer Name */}
        <div className="space-y-2">
          <label htmlFor="customerName" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-orange-400" />
            Customer Name <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <input
              id="customerName"
              type="text"
              value={session.customerName}
              onChange={(e) => updateCustomer('customerName', e.target.value)}
              placeholder="e.g. Rahul Patil"
              className="w-full glass-input px-4 py-3 text-sm placeholder:text-neutral-600 focus:text-white"
              required
            />
          </div>
          <p className="text-[11px] text-neutral-500">Auto-populates Vehicle 1 primary rider</p>
        </div>

        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-orange-400" />
            Phone Number <span className="text-orange-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-400">
              +91
            </span>
            <input
              id="phoneNumber"
              type="tel"
              maxLength={10}
              value={session.phoneNumber}
              onChange={(e) => {
                const numericOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                updateCustomer('phoneNumber', numericOnly);
              }}
              placeholder="9876543210"
              className="w-full glass-input pl-12 pr-4 py-3 text-sm font-mono placeholder:text-neutral-600 focus:text-white"
              required
            />
          </div>
          <p className="text-[11px] text-neutral-500">Auto-populates Vehicle 1 primary phone</p>
        </div>
      </div>
    </div>
  );
}
