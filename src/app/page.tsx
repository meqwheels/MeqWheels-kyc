'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { CustomerForm } from '@/components/CustomerForm';
import { VehicleCard } from '@/components/VehicleCard';
import { AddVehicleButton } from '@/components/AddVehicleButton';
import { ContinueButton } from '@/components/ContinueButton';
import { useRental } from '@/context/RentalContext';
import { Bike, Layers } from 'lucide-react';

export default function CreateRentalSessionPage() {
  const { session } = useRental();

  return (
    <div className="flex flex-col min-h-screen bg-black text-[#F5F5F7]">
      {/* Apple Navigation Header */}
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-7">
        {/* Apple Large Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#8E8E93] text-[11px] font-medium tracking-wide uppercase mb-2">
              <Layers className="w-3 h-3 text-[#FF9500]" />
              <span>Counter Terminal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Create Rental Session
            </h1>
          </div>

          <div className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-[#1C1C1E] border border-white/[0.08] text-right">
            <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Allocated</span>
            <span className="text-xs font-mono font-bold text-[#FF9500]">
              {session.vehicles.length} {session.vehicles.length === 1 ? 'Vehicle' : 'Vehicles'}
            </span>
          </div>
        </div>

        {/* Section 1: Customer Details */}
        <section aria-label="Customer Information">
          <CustomerForm />
        </section>

        {/* Section 2: Vehicles & Riders List */}
        <section aria-label="Vehicle and Rider Allocations" className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#FF9500]/12 flex items-center justify-center text-[#FF9500]">
                <Bike className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
                Vehicles & Riders
              </h2>
            </div>

            <span className="text-[11px] font-medium text-[#8E8E93]">
              Up to 2 riders per bike
            </span>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="space-y-4">
            {session.vehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                canDelete={session.vehicles.length > 1}
              />
            ))}
          </div>

          {/* Add Vehicle Action */}
          <div className="pt-1">
            <AddVehicleButton />
          </div>
        </section>
      </main>

      {/* Sticky Bottom Action Dock */}
      <ContinueButton />
    </div>
  );
}
