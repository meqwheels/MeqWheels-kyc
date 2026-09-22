'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

export function AddVehicleButton() {
  const { addVehicle, session } = useRental();

  return (
    <button
      type="button"
      onClick={addVehicle}
      className="w-full group flex items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#FF9500]/40 transition-all duration-200 ios-pressable cursor-pointer text-left"
    >
      <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#1C1C1E] text-[#FF9500] border border-white/[0.08] group-hover:border-[#FF9500]/30 transition-colors">
        <Plus className="w-4 h-4 transition-transform group-hover:scale-110" />
      </div>

      <div className="flex-1">
        <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#FF9500] transition-colors flex items-center gap-2">
          <span>Add Another Vehicle</span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#1C1C1E] text-[#8E8E93] border border-white/[0.06]">
            {session.vehicles.length} Active
          </span>
        </div>
        <p className="text-[11px] text-[#8E8E93] mt-0.5">
          Link additional bikes to this booking with independent riders
        </p>
      </div>
    </button>
  );
}
