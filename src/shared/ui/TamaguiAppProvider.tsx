// @ts-nocheck
import React, { PropsWithChildren } from 'react';

type TamaguiAppProviderProps = PropsWithChildren<{}>;

export function TamaguiAppProvider({ children }: TamaguiAppProviderProps) {
  return <>{children}</>;
}
