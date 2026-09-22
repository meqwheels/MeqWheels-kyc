'use client';

import React from 'react';
import { Trash2, UserCheck, Shield } from 'lucide-react';
import { Vehicle } from '@/types/kyc';
import { useRental } from '@/context/RentalContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
  canDelete: boolean;
}

export function VehicleCard({ vehicle, index, canDelete }: VehicleCardProps) {
  const {
    session,
    removeVehicle,
    updateVehicleNumber,
    toggleSecondRider,
    updateRider,
  } = useRental();

  // Dynamic sequential rider numbers based on all preceding vehicles
  let startRiderNumber = 1;
  for (let i = 0; i < index; i++) {
    startRiderNumber += session.vehicles[i]?.hasSecondRider ? 2 : 1;
  }
  const rider1Number = startRiderNumber;
  const rider2Number = startRiderNumber + 1;

  const handleCopyCustomerToRider1 = () => {
    if (session.customerName) {
      updateRider(vehicle.id, 1, 'name', session.customerName);
    }
    if (session.phoneNumber) {
      updateRider(vehicle.id, 1, 'phone', session.phoneNumber);
    }
  };

  return (
    <div className="bg-[#1C1C1E] rounded-2xl border border-white/[0.08] p-5 sm:p-6 space-y-5 transition-all">
      {/* Vehicle Card Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#2C2C2E] text-white font-mono font-semibold text-xs border border-white/[0.08]">
            0{index + 1}
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Vehicle {index + 1}
            </h3>
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] text-[#8E8E93]">
              {vehicle.hasSecondRider ? '2 Riders' : '1 Rider'}
            </span>
          </div>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={() => removeVehicle(vehicle.id)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-[#FF3B30] hover:bg-[#FF3B30]/10 rounded-lg transition-colors border border-transparent hover:border-[#FF3B30]/20 ios-pressable cursor-pointer"
            title="Remove this vehicle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Vehicle Registration Number */}
        <div className="space-y-1.5">
          <label
            htmlFor={`veh-num-${vehicle.id}`}
            className="text-[12px] font-medium text-[#8E8E93] flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <span>Vehicle Number</span>
              <span className="text-[#FF9500]">*</span>
            </span>
            <span className="text-[11px] text-[#636366]">e.g. MH30AB1234</span>
          </label>
          <input
            id={`veh-num-${vehicle.id}`}
            type="text"
            value={vehicle.vehicleNumber}
            onChange={(e) => updateVehicleNumber(vehicle.id, e.target.value)}
            placeholder="MH30AB1234"
            className="w-full glass-input px-3.5 py-2.5 text-sm font-mono uppercase tracking-widest placeholder:text-[#636366] text-white"
            required
          />
        </div>

        {/* Primary Rider (Rider 1) Inset Box */}
        <div className="bg-[#2C2C2E]/40 rounded-xl p-4 border border-white/[0.06] space-y-3.5">
          <div className="flex items-center justify-between">
            <h4 className="text-[12px] font-semibold tracking-wide text-white flex items-center gap-1.5">
              <span>Primary Rider (Rider {rider1Number})</span>
            </h4>

            {index === 0 ? (
              <span className="text-[11px] text-[#34C759] bg-[#34C759]/10 border border-[#34C759]/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <UserCheck className="w-3 h-3" />
                <span>Synced from Customer</span>
              </span>
            ) : (
              session.customerName && (
                <button
                  type="button"
                  onClick={handleCopyCustomerToRider1}
                  className="text-[11px] text-[#8E8E93] hover:text-[#FF9500] transition-colors flex items-center gap-1 ios-pressable cursor-pointer"
                  title="Fill with Customer details"
                >
                  <UserCheck className="w-3 h-3" />
                  <span>Same as Customer</span>
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Rider 1 Name */}
            <div className="space-y-1">
              <label
                htmlFor={`r1-name-${vehicle.id}`}
                className="text-[11px] font-medium text-[#8E8E93]"
              >
                Full Name <span className="text-[#FF9500]">*</span>
              </label>
              <input
                id={`r1-name-${vehicle.id}`}
                type="text"
                value={vehicle.rider1.name}
                onChange={(e) => updateRider(vehicle.id, 1, 'name', e.target.value)}
                placeholder="e.g. Rahul Patil"
                className="w-full glass-input px-3 py-2 text-sm placeholder:text-[#636366] text-white"
                required
              />
            </div>

            {/* Rider 1 Phone */}
            <div className="space-y-1">
              <label
                htmlFor={`r1-phone-${vehicle.id}`}
                className="text-[11px] font-medium text-[#8E8E93]"
              >
                Mobile Number <span className="text-[#FF9500]">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8E8E93] select-none pointer-events-none">
                  +91
                </span>
                <input
                  id={`r1-phone-${vehicle.id}`}
                  type="tel"
                  maxLength={10}
                  value={vehicle.rider1.phone}
                  onChange={(e) => {
                    const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                    updateRider(vehicle.id, 1, 'phone', clean);
                  }}
                  placeholder="9876543210"
                  className="w-full glass-input pl-11 pr-3 py-2 text-sm font-mono placeholder:text-[#636366] text-white"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second Rider: iOS Native Switch Control Row */}
        <div className="flex items-center justify-between py-2 px-1">
          <div>
            <div className="text-xs sm:text-sm font-medium text-white">
              Second Rider (Rider {rider2Number})
            </div>
            <p className="text-[11px] text-[#8E8E93]">
              Assign an optional co-rider / pillion for DigiLocker verification
            </p>
          </div>

          <label className="ios-switch">
            <input
              type="checkbox"
              checked={vehicle.hasSecondRider}
              onChange={(e) => toggleSecondRider(vehicle.id, e.target.checked)}
            />
            <span className="ios-slider" />
          </label>
        </div>

        {/* Second Rider Form Fields (Animated In when toggled) */}
        {vehicle.hasSecondRider && (
          <div className="bg-[#2C2C2E]/40 rounded-xl p-4 border border-white/[0.06] space-y-3.5 animate-in fade-in slide-in-from-top-2 duration-200">
            <h4 className="text-[12px] font-semibold tracking-wide text-white">
              Second Rider Details (Rider {rider2Number})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Rider 2 Name */}
              <div className="space-y-1">
                <label
                  htmlFor={`r2-name-${vehicle.id}`}
                  className="text-[11px] font-medium text-[#8E8E93]"
                >
                  Full Name <span className="text-[#FF9500]">*</span>
                </label>
                <input
                  id={`r2-name-${vehicle.id}`}
                  type="text"
                  value={vehicle.rider2?.name || ''}
                  onChange={(e) => updateRider(vehicle.id, 2, 'name', e.target.value)}
                  placeholder="e.g. Amit Sharma"
                  className="w-full glass-input px-3 py-2 text-sm placeholder:text-[#636366] text-white"
                  required
                />
              </div>

              {/* Rider 2 Phone */}
              <div className="space-y-1">
                <label
                  htmlFor={`r2-phone-${vehicle.id}`}
                  className="text-[11px] font-medium text-[#8E8E93]"
                >
                  Mobile Number <span className="text-[#FF9500]">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#8E8E93] select-none pointer-events-none">
                    +91
                  </span>
                  <input
                    id={`r2-phone-${vehicle.id}`}
                    type="tel"
                    maxLength={10}
                    value={vehicle.rider2?.phone || ''}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, '').slice(0, 10);
                      updateRider(vehicle.id, 2, 'phone', clean);
                    }}
                    placeholder="9123456789"
                    className="w-full glass-input pl-11 pr-3 py-2 text-sm font-mono placeholder:text-[#636366] text-white"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
