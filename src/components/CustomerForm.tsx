'use client';

import React from 'react';
import { User, Phone, Hash } from 'lucide-react';
import { useRental } from '@/context/RentalContext';
import { BorderBeam } from '@/components/ui/border-beam';

export function CustomerForm() {
  const { session, updateCustomer } = useRental();
  const currentYear = new Date().getFullYear();
  const prefix = `MEQ-${currentYear}-`;

  // Extract the custom number suffix from the session Booking ID
  const getSuffix = (id: string) => {
    if (!id) return '';
    if (id.startsWith(prefix)) {
      return id.slice(prefix.length);
    }
    const match = id.match(/^MEQ-\d{4}-(.*)$/i);
    if (match) return match[1];
    return id.replace(/^MEQ-/i, '');
  };

  const handleSuffixChange = (val: string) => {
    const cleanSuffix = val.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    updateCustomer('customerId', `${prefix}${cleanSuffix}`);
  };

  return (
    <div className="bg-[#1C1C1E] border border-white/[0.08] rounded-2xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300">
      {/* Vengeance UI Border Beam accent */}
      <BorderBeam size={200} duration={16} colorFrom="#FF9500" colorTo="#FF2D55" borderWidth={1.5} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#2C2C2E] flex items-center justify-center text-[#FF9500]">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Customer Information</h2>
            <p className="text-xs text-[#8E8E93]">Primary booking contact linked to all rented vehicles</p>
          </div>
        </div>

        <span className="self-start sm:self-auto text-[11px] font-mono font-medium px-2.5 py-1 rounded-lg bg-white/[0.04] text-[#8E8E93] border border-white/[0.06]">
          Step 1 of 2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Booking ID */}
        <div className="space-y-1.5">
          <label htmlFor="customerIdSuffix" className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-[#FF9500]" />
            Booking ID <span className="text-[#FF9500]">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#8E8E93] select-none pointer-events-none tracking-wider bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded-lg">
              {prefix}
            </span>
            <input
              id="customerIdSuffix"
              type="text"
              value={getSuffix(session.customerId)}
              onChange={(e) => handleSuffixChange(e.target.value)}
              placeholder="Enter ID number"
              className="w-full bg-[#2C2C2E]/60 border border-white/[0.08] focus:border-[#FF9500] focus:ring-2 focus:ring-[#FF9500]/20 rounded-xl pl-[126px] pr-4 py-3 text-sm font-mono tracking-wider text-white placeholder:text-[#636366] transition-all min-h-[44px]"
              required
            />
          </div>
          <p className="text-[11px] text-[#636366]">Fixed prefix: {prefix} (enter custom number)</p>
        </div>

        {/* Customer Name */}
        <div className="space-y-1.5">
          <label htmlFor="customerName" className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#FF9500]" />
            Customer Name <span className="text-[#FF9500]">*</span>
          </label>
          <div className="relative">
            <input
              id="customerName"
              type="text"
              value={session.customerName}
              onChange={(e) => updateCustomer('customerName', e.target.value)}
              placeholder="e.g. Rahul Patil"
              className="w-full bg-[#2C2C2E]/60 border border-white/[0.08] focus:border-[#FF9500] focus:ring-2 focus:ring-[#FF9500]/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#636366] transition-all min-h-[44px]"
              required
            />
          </div>
          <p className="text-[11px] text-[#636366]">Auto-populates Vehicle 1 primary rider</p>
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label htmlFor="phoneNumber" className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#FF9500]" />
            Phone Number <span className="text-[#FF9500]">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono font-medium text-[#8E8E93] select-none pointer-events-none">
              +91
            </span>
            <input
              id="phoneNumber"
              type="tel"
              maxLength={10}
              value={session.phoneNumber}
              onChange={(e) => {
                const numeric = e.target.value.replace(/\D/g, '');
                updateCustomer('phoneNumber', numeric);
              }}
              placeholder="9876543210"
              className="w-full bg-[#2C2C2E]/60 border border-white/[0.08] focus:border-[#FF9500] focus:ring-2 focus:ring-[#FF9500]/20 rounded-xl pl-12 pr-4 py-3 text-sm font-mono tracking-wider text-white placeholder:text-[#636366] transition-all min-h-[44px]"
              required
            />
          </div>
          <p className="text-[11px] text-[#636366]">10-digit primary contact number</p>
        </div>
      </div>
    </div>
  );
}
