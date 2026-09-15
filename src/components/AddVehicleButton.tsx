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
      className="w-full group relative overflow-hidden flex flex-col sm:flex-row items-center justify-center gap-3 p-6 rounded-[24px] border-2 border-dashed border-white/15 hover:border-orange-500/60 bg-white/[0.02] hover:bg-orange-500/[0.04] transition-all duration-300 cursor-pointer text-center"
    >
      <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-white/[0.04] group-hover:bg-orange-500/20 text-neutral-300 group-hover:text-orange-400 border border-white/[0.08] group-hover:border-orange-500/30 transition-all duration-300 shadow-inner">
        <Plus className="w-5 h-5 transition-transform group-hover:scale-110 group-hover:rotate-90 duration-300" />
      </div>

      <div className="text-left">
        <div className="text-sm sm:text-base font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2 justify-center sm:justify-start">
          + Add Another Vehicle
          <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-white/[0.06] text-neutral-400">
            Current: {session.vehicles.length}
          </span>
        </div>
        <p className="text-xs text-neutral-400 group-hover:text-neutral-300 transition-colors mt-0.5">
          Link additional bikes to this Booking ID with independent riders
        </p>
      </div>
    </button>
  );
}
