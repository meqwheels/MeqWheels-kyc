'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { useRental } from '@/context/RentalContext';

import { motion } from 'framer-motion';

export function AddVehicleButton() {
  const { addVehicle, session } = useRental();

  return (
    <motion.button
      type="button"
      onClick={addVehicle}
      whileHover={{ scale: 1.008 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      className="w-full group relative overflow-hidden flex flex-col sm:flex-row items-center justify-center gap-3.5 p-5 sm:p-6 rounded-2xl border-2 border-dashed border-white/[0.12] hover:border-[#FF9500]/50 bg-[#1C1C1E]/60 hover:bg-[#1C1C1E] transition-colors duration-200 cursor-pointer text-center ios-pressable"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-[#2C2C2E] group-hover:bg-[#FF9500]/15 text-[#8E8E93] group-hover:text-[#FF9500] border border-white/[0.06] group-hover:border-[#FF9500]/30 transition-all duration-200">
        <Plus className="w-5 h-5 transition-transform group-hover:scale-110 duration-200" />
      </div>

      <div className="text-left">
        <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#FF9500] transition-colors flex items-center gap-2 justify-center sm:justify-start">
          Add Another Vehicle
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-[#8E8E93]">
            Current: {session.vehicles.length}
          </span>
        </div>
        <p className="text-xs text-[#8E8E93] group-hover:text-[#E5E5EA] transition-colors mt-0.5">
          Link additional bikes to this Booking ID with independent riders
        </p>
      </div>
    </motion.button>
  );
}
