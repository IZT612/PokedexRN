import React, { PropsWithChildren } from 'react';

import { tamaguiConfig } from '../../../tamagui.config';

type TamaguiAppProviderProps = PropsWithChildren<{}>;

export function TamaguiAppProvider({ children }: TamaguiAppProviderProps) {
  void tamaguiConfig;
  return <>{children}</>;
}

export { tamaguiConfig };
