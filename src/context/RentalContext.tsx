'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CustomerSession, Vehicle, Rider, FlattenedRiderKYC } from '@/types/kyc';

function getCurrentYear(): number {
  return new Date().getFullYear();
}

function getDefaultCustomerId(): string {
  return `MEQ-${getCurrentYear()}-`;
}

function createDefaultRider(riderNumber: 1 | 2, vehicleId: string = 'veh-1'): Rider {
  return {
    id: `${vehicleId}-r${riderNumber}`,
    riderNumber,
    name: '',
    phone: '',
    kycStatus: 'pending',
  };
}

function createDefaultVehicle(id: string = 'veh-1'): Vehicle {
  return {
    id,
    vehicleNumber: '',
    hasSecondRider: false,
    rider1: createDefaultRider(1, id),
  };
}

function createInitialSession(): CustomerSession {
  return {
    customerId: getDefaultCustomerId(),
    customerName: '',
    phoneNumber: '',
    vehicles: [createDefaultVehicle('veh-1')],
    createdAt: '',
    updatedAt: '',
  };
}

interface RentalContextType {
  session: CustomerSession;
  updateCustomer: (field: 'customerId' | 'customerName' | 'phoneNumber', value: string) => void;
  addVehicle: () => void;
  removeVehicle: (vehicleId: string) => void;
  updateVehicleNumber: (vehicleId: string, vehicleNumber: string) => void;
  toggleSecondRider: (vehicleId: string, enable: boolean) => void;
  updateRider: (vehicleId: string, riderNumber: 1 | 2, field: 'name' | 'phone', value: string) => void;
  verifyRider: (vehicleId: string, riderId: string) => Promise<void>;
  verifyAllRiders: () => Promise<void>;
  resetRiderVerification: (vehicleId: string, riderId: string) => void;
  resetSession: () => void;
  loadDemoData: () => void;
  getAllRiders: () => FlattenedRiderKYC[];
  getVerificationStats: () => { total: number; verified: number; pending: number; percent: number };
}

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export function RentalProvider({ children }: { children: React.ReactNode }) {
  // Pure in-memory React state — persists across route navigation in the session,
  // but completely resets upon browser refresh (F5) or tab reopening.
  const [session, setSession] = useState<CustomerSession>(createInitialSession);

  // Clean up any old persistent storage keys if present from previous builds
  useEffect(() => {
    try {
      localStorage.removeItem('meq_wheels_rental_session_v1');
      localStorage.removeItem('meq_wheels_rental_session_v2');
      sessionStorage.clear();
    } catch {
      // Ignore in environments where storage is restricted
    }
  }, []);

  // Update customer and automatically sync Customer Name & Phone into Vehicle 1 Primary Rider
  // Also resets KYC status to pending for any modified rider/customer
  const updateCustomer = useCallback((field: 'customerId' | 'customerName' | 'phoneNumber', value: string) => {
    setSession((prev) => {
      let updatedVehicles = prev.vehicles;

      if (field === 'customerName') {
        updatedVehicles = prev.vehicles.map((v, index) => {
          if (index === 0) {
            const hasChanged = v.rider1.name !== value;
            return {
              ...v,
              rider1: {
                ...v.rider1,
                name: value,
                ...(hasChanged ? { kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined } : {}),
              },
            };
          }
          return v;
        });
      } else if (field === 'phoneNumber') {
        updatedVehicles = prev.vehicles.map((v, index) => {
          if (index === 0) {
            const hasChanged = v.rider1.phone !== value;
            return {
              ...v,
              rider1: {
                ...v.rider1,
                phone: value,
                ...(hasChanged ? { kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined } : {}),
              },
            };
          }
          return v;
        });
      } else if (field === 'customerId') {
        const hasChanged = prev.customerId !== value;
        if (hasChanged) {
          // If customer ID is modified, all riders must re-verify KYC for the new booking ID
          updatedVehicles = prev.vehicles.map((v) => ({
            ...v,
            rider1: { ...v.rider1, kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined },
            rider2: v.rider2
              ? { ...v.rider2, kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined }
              : undefined,
          }));
        }
      }

      return {
        ...prev,
        [field]: value,
        vehicles: updatedVehicles,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const addVehicle = useCallback(() => {
    setSession((prev) => {
      const nextNum = prev.vehicles.length + 1;
      const nextId = `veh-${nextNum}-${Date.now()}`;
      return {
        ...prev,
        vehicles: [...prev.vehicles, createDefaultVehicle(nextId)],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const removeVehicle = useCallback((vehicleId: string) => {
    setSession((prev) => {
      if (prev.vehicles.length <= 1) return prev;
      return {
        ...prev,
        vehicles: prev.vehicles.filter((v) => v.id !== vehicleId),
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const updateVehicleNumber = useCallback((vehicleId: string, vehicleNumber: string) => {
    const formatted = vehicleNumber.toUpperCase();
    setSession((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => {
        if (v.id !== vehicleId) return v;
        const hasChanged = v.vehicleNumber !== formatted;
        return {
          ...v,
          vehicleNumber: formatted,
          rider1: hasChanged
            ? { ...v.rider1, kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined }
            : v.rider1,
          rider2:
            v.rider2 && hasChanged
              ? { ...v.rider2, kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined }
              : v.rider2,
        };
      }),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const toggleSecondRider = useCallback((vehicleId: string, enable: boolean) => {
    setSession((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => {
        if (v.id !== vehicleId) return v;
        if (enable) {
          return {
            ...v,
            hasSecondRider: true,
            rider2: v.rider2 || createDefaultRider(2, vehicleId),
          };
        } else {
          return {
            ...v,
            hasSecondRider: false,
            rider2: undefined,
          };
        }
      }),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const updateRider = useCallback(
    (vehicleId: string, riderNumber: 1 | 2, field: 'name' | 'phone', value: string) => {
      setSession((prev) => ({
        ...prev,
        vehicles: prev.vehicles.map((v) => {
          if (v.id !== vehicleId) return v;
          if (riderNumber === 1) {
            const hasChanged = v.rider1[field] !== value;
            return {
              ...v,
              rider1: {
                ...v.rider1,
                [field]: value,
                ...(hasChanged ? { kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined } : {}),
              },
            };
          } else {
            const hasChanged = v.rider2?.[field] !== value;
            return {
              ...v,
              rider2: v.rider2
                ? {
                    ...v.rider2,
                    [field]: value,
                    ...(hasChanged ? { kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined } : {}),
                  }
                : undefined,
            };
          }
        }),
        updatedAt: new Date().toISOString(),
      }));
    },
    []
  );

  const verifyRider = useCallback(async (vehicleId: string, riderId: string) => {
    // Set status to verifying
    setSession((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => {
        if (v.id !== vehicleId) return v;
        const rider1 = v.rider1.id === riderId ? { ...v.rider1, kycStatus: 'verifying' as const } : v.rider1;
        const rider2 = v.rider2?.id === riderId ? { ...v.rider2, kycStatus: 'verifying' as const } : v.rider2;
        return { ...v, rider1, rider2 };
      }),
    }));

    // Simulate DigiLocker API response latency (500ms)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const refId = `DL-${Math.floor(100000 + Math.random() * 900000)}`;

    setSession((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => {
        if (v.id !== vehicleId) return v;
        const rider1 =
          v.rider1.id === riderId
            ? {
                ...v.rider1,
                kycStatus: 'verified' as const,
                verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                referenceId: refId,
              }
            : v.rider1;
        const rider2 =
          v.rider2?.id === riderId
            ? {
                ...v.rider2,
                kycStatus: 'verified' as const,
                verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                referenceId: refId,
              }
            : v.rider2;
        return { ...v, rider1, rider2 };
      }),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const verifyAllRiders = useCallback(async () => {
    const riders = getAllRiders();
    const pendingRiders = riders.filter((r) => r.rider.kycStatus !== 'verified');
    
    for (const item of pendingRiders) {
      await verifyRider(item.vehicleId, item.rider.id);
    }
  }, [session]);

  const resetRiderVerification = useCallback((vehicleId: string, riderId: string) => {
    setSession((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => {
        if (v.id !== vehicleId) return v;
        const rider1 =
          v.rider1.id === riderId
            ? { ...v.rider1, kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined }
            : v.rider1;
        const rider2 =
          v.rider2?.id === riderId
            ? { ...v.rider2, kycStatus: 'pending' as const, verifiedAt: undefined, referenceId: undefined }
            : v.rider2;
        return { ...v, rider1, rider2 };
      }),
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetSession = useCallback(() => {
    setSession(createInitialSession());
  }, []);

  const loadDemoData = useCallback(() => {
    const currentYear = getCurrentYear();
    const demo: CustomerSession = {
      customerId: `MEQ-${currentYear}-00001`,
      customerName: 'Rahul Patil',
      phoneNumber: '9876543210',
      vehicles: [
        {
          id: 'veh-demo-1',
          vehicleNumber: 'MH30AB1234',
          hasSecondRider: true,
          rider1: {
            id: 'rider-demo-1',
            riderNumber: 1,
            name: 'Rahul Patil',
            phone: '9876543210',
            kycStatus: 'pending',
          },
          rider2: {
            id: 'rider-demo-2',
            riderNumber: 2,
            name: 'Amit Sharma',
            phone: '9123456789',
            kycStatus: 'pending',
          },
        },
        {
          id: 'veh-demo-2',
          vehicleNumber: 'MH27XY7788',
          hasSecondRider: false,
          rider1: {
            id: 'rider-demo-3',
            riderNumber: 1,
            name: 'Rohan Patil',
            phone: '9988776655',
            kycStatus: 'pending',
          },
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setSession(demo);
  }, []);

  const getAllRiders = useCallback((): FlattenedRiderKYC[] => {
    const list: FlattenedRiderKYC[] = [];
    let riderCounter = 1;
    session.vehicles.forEach((v) => {
      list.push({
        uniqueKey: `${v.id}-r1`,
        vehicleId: v.id,
        vehicleNumber: v.vehicleNumber || 'UNASSIGNED',
        rider: v.rider1,
        globalRiderNumber: riderCounter++,
        customerName: session.customerName || 'N/A',
        customerId: session.customerId || getDefaultCustomerId(),
      });
      if (v.hasSecondRider && v.rider2) {
        list.push({
          uniqueKey: `${v.id}-r2`,
          vehicleId: v.id,
          vehicleNumber: v.vehicleNumber || 'UNASSIGNED',
          rider: v.rider2,
          globalRiderNumber: riderCounter++,
          customerName: session.customerName || 'N/A',
          customerId: session.customerId || getDefaultCustomerId(),
        });
      }
    });
    return list;
  }, [session]);

  const getVerificationStats = useCallback(() => {
    const all = getAllRiders();
    const total = all.length;
    const verified = all.filter((r) => r.rider.kycStatus === 'verified').length;
    const pending = total - verified;
    const percent = total > 0 ? Math.round((verified / total) * 100) : 0;
    return { total, verified, pending, percent };
  }, [getAllRiders]);

  return (
    <RentalContext.Provider
      value={{
        session,
        updateCustomer,
        addVehicle,
        removeVehicle,
        updateVehicleNumber,
        toggleSecondRider,
        updateRider,
        verifyRider,
        verifyAllRiders,
        resetRiderVerification,
        resetSession,
        loadDemoData,
        getAllRiders,
        getVerificationStats,
      }}
    >
      {children}
    </RentalContext.Provider>
  );
}

export function useRental() {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
}
