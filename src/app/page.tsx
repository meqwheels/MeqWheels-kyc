'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { CustomerForm } from '@/components/CustomerForm';
import { VehicleCard } from '@/components/VehicleCard';
import { AddVehicleButton } from '@/components/AddVehicleButton';
import { ContinueButton } from '@/components/ContinueButton';
import { Footer } from '@/components/Footer';
import { useRental } from '@/context/RentalContext';
import { Bike, Layers } from 'lucide-react';
import { AnimatedRays } from '@/components/ui/animated-rays';

export default function CreateRentalSessionPage() {
  const { session } = useRental();

  return (
    <div className="flex flex-col min-h-screen bg-[#08080C] text-[#F5F5F7] antialiased relative">
      {/* Vengeance UI Animated Rays Full Page Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AnimatedRays fullPage className="w-full h-full opacity-45" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        {/* Main Content Area */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-7">
          {/* Page Hero Intro — Apple Large Title & Layout */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-1">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8E93] block">
                Counter Booking Terminal
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Create Rental Session
              </h1>
              <p className="text-xs sm:text-sm text-[#8E8E93] mt-1 max-w-2xl leading-relaxed">
                Link one Booking ID to multiple rented vehicles and assign up to 2 independent riders per bike.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="px-3.5 py-2 rounded-2xl bg-[#1C1C1E] border border-white/[0.08] text-right">
                <span className="text-[10px] uppercase tracking-wider text-[#8E8E93] block">Session Vehicles</span>
                <span className="text-sm font-mono font-bold text-[#FF9500]">
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
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#2C2C2E] flex items-center justify-center text-[#FF9500]">
                  <Bike className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Allocated Vehicles &amp; Riders
                  </h2>
                  <p className="text-xs text-[#8E8E93]">
                    Each vehicle can have up to 2 riders with mandatory DigiLocker verification
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-[#8E8E93]">
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
            <div className="pt-1">
              <AddVehicleButton />
            </div>
          </section>
        </main>

        <Footer bookingId={session.customerId} />

        {/* Sticky Bottom Action Button */}
        <ContinueButton />
      </div>
    </div>
  );
}
