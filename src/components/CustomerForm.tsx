'use client';

import React from 'react';
import { User, Phone, Hash } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

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
    <div className="space-y-2">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#FF9500]/12 flex items-center justify-center text-[#FF9500]">
            <User className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
            Customer Details
          </h2>
        </div>
        <span className="text-[11px] font-medium text-[#8E8E93] px-2 py-0.5 rounded-full bg-[#1C1C1E] border border-white/[0.06]">
          Step 1 of 2
        </span>
      </div>

      {/* Inset Grouped Card */}
      <div className="bg-[#1C1C1E] rounded-2xl border border-white/[0.08] p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* Booking ID */}
          <div className="space-y-1.5">
            <label
              htmlFor="customerIdSuffix"
              className="text-[12px] font-medium text-[#8E8E93] flex items-center gap-1.5"
            >
              <Hash className="w-3 h-3 text-[#FF9500]" />
              <span>Booking ID</span>
              <span className="text-[#FF9500]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-[#8E8E93] select-none pointer-events-none bg-[#2C2C2E] px-2 py-1 rounded-md border border-white/[0.06]">
                {prefix}
              </span>
              <input
                id="customerIdSuffix"
                type="text"
                value={getSuffix(session.customerId)}
                onChange={(e) => handleSuffixChange(e.target.value)}
                placeholder="00001"
                className="w-full glass-input pl-[124px] pr-3 py-2.5 text-sm font-mono tracking-wider placeholder:text-[#636366] text-white"
                required
              />
            </div>
            <p className="text-[11px] text-[#636366]">Prefix is fixed; enter ID number</p>
          </div>

          {/* Customer Name */}
          <div className="space-y-1.5">
            <label
              htmlFor="customerName"
              className="text-[12px] font-medium text-[#8E8E93] flex items-center gap-1.5"
            >
              <User className="w-3 h-3 text-[#FF9500]" />
              <span>Customer Name</span>
              <span className="text-[#FF9500]">*</span>
            </label>
            <input
              id="customerName"
              type="text"
              value={session.customerName}
              onChange={(e) => updateCustomer('customerName', e.target.value)}
              placeholder="e.g. Rahul Patil"
              className="w-full glass-input px-3.5 py-2.5 text-sm placeholder:text-[#636366] text-white"
              required
            />
            <p className="text-[11px] text-[#636366]">Links to Vehicle 1 primary rider</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label
              htmlFor="phoneNumber"
              className="text-[12px] font-medium text-[#8E8E93] flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3 text-[#FF9500]" />
              <span>Phone Number</span>
              <span className="text-[#FF9500]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8E8E93] select-none pointer-events-none">
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
                className="w-full glass-input pl-11 pr-3 py-2.5 text-sm font-mono placeholder:text-[#636366] text-white"
                required
              />
            </div>
            <p className="text-[11px] text-[#636366]">10-digit mobile number</p>
          </div>
        </div>
      </div>
    </div>
  );
}
