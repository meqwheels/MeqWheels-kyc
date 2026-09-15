'use client';

import React from 'react';
import { RentalProvider } from '@/context/RentalContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return <RentalProvider>{children}</RentalProvider>;
}
