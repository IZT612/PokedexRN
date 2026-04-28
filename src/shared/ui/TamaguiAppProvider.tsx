import React, { PropsWithChildren } from "react";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../../../tamagui.config";

type TamaguiAppProviderProps = PropsWithChildren<{}>;

export function TamaguiAppProvider({ children }: TamaguiAppProviderProps) {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      {children}
    </TamaguiProvider>
  );
}
