'use client';

import React from 'react';
import { Trash2, Plus, Minus, UserCheck, Shield, ChevronDown, ChevronUp } from 'lucide-react';
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

  // Calculate dynamic sequential rider numbers based on all preceding vehicles
  let startRiderNumber = 1;
  for (let i = 0; i < index; i++) {
    startRiderNumber += session.vehicles[i]?.hasSecondRider ? 2 : 1;
  }
  const rider1Number = startRiderNumber;
  const rider2Number = startRiderNumber + 1;

  // Convenience helper: copy customer details to Rider 1
  const handleCopyCustomerToRider1 = () => {
    if (session.customerName) {
      updateRider(vehicle.id, 1, 'name', session.customerName);
    }
    if (session.phoneNumber) {
      updateRider(vehicle.id, 1, 'phone', session.phoneNumber);
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-7 relative overflow-hidden transition-all duration-300 hover:border-white/15">
      {/* Top Header for Vehicle Card */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/[0.06] mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-500/10 text-orange-400 font-mono font-bold text-xs border border-orange-500/25">
            0{index + 1}
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Vehicle {index + 1}
              {vehicle.hasSecondRider ? (
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  2 Riders
                </span>
              ) : (
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 border border-white/[0.06]">
                  1 Rider
                </span>
              )}
            </h3>
            <p className="text-[11px] text-neutral-400">Independent riders assigned to this vehicle</p>
          </div>
        </div>

        {canDelete && (
          <button
            type="button"
            onClick={() => removeVehicle(vehicle.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors border border-red-500/20 cursor-pointer"
            title="Remove this vehicle"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove Vehicle</span>
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Vehicle Registration Number */}
        <div className="space-y-2">
          <label
            htmlFor={`veh-num-${vehicle.id}`}
            className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              Vehicle Number <span className="text-orange-500">*</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-normal">e.g. MH30AB1234 or KA01XY9876</span>
          </label>
          <div className="relative">
            <input
              id={`veh-num-${vehicle.id}`}
              type="text"
              value={vehicle.vehicleNumber}
              onChange={(e) => updateVehicleNumber(vehicle.id, e.target.value)}
              placeholder="e.g. MH30AB1234"
              className="w-full glass-input px-4 py-3 text-sm font-mono uppercase tracking-widest placeholder:text-neutral-600 focus:text-white"
              required
            />
          </div>
        </div>

        {/* Rider 1 Section */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
                Primary Rider (Rider {rider1Number})
              </h4>
            </div>

            {index === 0 ? (
              <span className="text-[11px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-medium">
                <UserCheck className="w-3 h-3 text-emerald-400" />
                <span>Auto-synced from Customer</span>
              </span>
            ) : (
              session.customerName && (
                <button
                  type="button"
                  onClick={handleCopyCustomerToRider1}
                  className="text-[11px] text-neutral-400 hover:text-orange-400 transition-colors flex items-center gap-1 hover:underline cursor-pointer"
                  title="Fill with Customer details"
                >
                  <UserCheck className="w-3 h-3" /> Same as Customer
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rider 1 Name */}
            <div className="space-y-1.5">
              <label
                htmlFor={`r1-name-${vehicle.id}`}
                className="text-[11px] font-medium text-neutral-300"
              >
                Rider {rider1Number} Name <span className="text-orange-500">*</span>
              </label>
              <input
                id={`r1-name-${vehicle.id}`}
                type="text"
                value={vehicle.rider1.name}
                onChange={(e) => updateRider(vehicle.id, 1, 'name', e.target.value)}
                placeholder="e.g. Rahul Patil"
                className="w-full glass-input px-3.5 py-2.5 text-sm placeholder:text-neutral-600 focus:text-white"
                required
              />
            </div>

            {/* Rider 1 Phone */}
            <div className="space-y-1.5">
              <label
                htmlFor={`r1-phone-${vehicle.id}`}
                className="text-[11px] font-medium text-neutral-300"
              >
                Rider {rider1Number} Phone <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500">
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
                  className="w-full glass-input pl-11 pr-3.5 py-2.5 text-sm font-mono placeholder:text-neutral-600 focus:text-white"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Add Rider Toggle */}
        <div className="pt-1">
          {!vehicle.hasSecondRider ? (
            <button
              type="button"
              onClick={() => toggleSecondRider(vehicle.id, true)}
              className="w-full group flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/50 text-orange-400 hover:text-orange-300 text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
              <span>+ Add Second Rider (Rider {rider2Number})</span>
            </button>
          ) : (
            /* Rider 2 Section */
            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-orange-500/20 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">
                    Second Rider (Rider {rider2Number})
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => toggleSecondRider(vehicle.id, false)}
                  className="text-xs text-neutral-400 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>Remove Rider {rider2Number}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Rider 2 Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`r2-name-${vehicle.id}`}
                    className="text-[11px] font-medium text-neutral-300"
                  >
                    Rider {rider2Number} Name <span className="text-orange-500">*</span>
                  </label>
                  <input
                    id={`r2-name-${vehicle.id}`}
                    type="text"
                    value={vehicle.rider2?.name || ''}
                    onChange={(e) => updateRider(vehicle.id, 2, 'name', e.target.value)}
                    placeholder="e.g. Amit Sharma"
                    className="w-full glass-input px-3.5 py-2.5 text-sm placeholder:text-neutral-600 focus:text-white"
                    required
                  />
                </div>

                {/* Rider 2 Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`r2-phone-${vehicle.id}`}
                    className="text-[11px] font-medium text-neutral-300"
                  >
                    Rider {rider2Number} Phone <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500">
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
                      className="w-full glass-input pl-11 pr-3.5 py-2.5 text-sm font-mono placeholder:text-neutral-600 focus:text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
