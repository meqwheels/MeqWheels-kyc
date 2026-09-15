'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { CustomerForm } from '@/components/CustomerForm';
import { VehicleCard } from '@/components/VehicleCard';
import { AddVehicleButton } from '@/components/AddVehicleButton';
import { ContinueButton } from '@/components/ContinueButton';
import { useRental } from '@/context/RentalContext';
import { Bike, Shield, Layers } from 'lucide-react';

export default function CreateRentalSessionPage() {
  const { session } = useRental();

  return (
    <div className="flex flex-col min-h-screen bg-[#08080C] text-neutral-100">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Page Hero Intro */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              Counter Booking Terminal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create Rental Session
            </h1>
            <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
              Link one Booking ID to multiple rented vehicles and assign up to 2 independent riders per bike.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-right">
              <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">Session Vehicles</span>
              <span className="text-sm font-mono font-bold text-orange-400">
                {session.vehicles.length} {session.vehicles.length === 1 ? 'Unit' : 'Units'}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Customer Details */}
        <section aria-label="Customer Information">
          <CustomerForm />
        </section>

        {/* Section 2: Vehicles & Riders List */}
        <section aria-label="Vehicle and Rider Allocations" className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Bike className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Allocated Vehicles & Riders
                </h2>
                <p className="text-xs text-neutral-400">
                  Each vehicle can have up to 2 riders with mandatory DigiLocker verification
                </p>
              </div>
            </div>

            <span className="text-xs font-mono text-neutral-500">
              {session.vehicles.length} {session.vehicles.length === 1 ? 'card' : 'cards'}
            </span>
          </div>

          {/* Vehicle Cards Grid */}
          <div className="space-y-5">
            {session.vehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                index={index}
                canDelete={session.vehicles.length > 1}
              />
            ))}
          </div>

          {/* Multiple Vehicle Button */}
          <div className="pt-2">
            <AddVehicleButton />
          </div>
        </section>
      </main>

      {/* Sticky Bottom Action Button */}
      <ContinueButton />
    </div>
  );
}
