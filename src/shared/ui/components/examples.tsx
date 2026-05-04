import React from "react";
import { YStack } from "tamagui";

import { Button } from "./Button";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchInput } from "./SearchInput";
import { uiTokens } from "./tokens";

export function SharedUiExamples() {
  return (
    <YStack padding={uiTokens.spacing.lg} gap={uiTokens.spacing.md}>
      <SearchInput
        value=""
        onChangeText={() => undefined}
        onSubmitQuery={() => undefined}
        placeholder="Search Pokemon"
      />
      <Button label="Primary action" onPress={() => undefined} />
      <Button label="Loading" loading />
      <Card>
        <Chip label="Electric" selected />
      </Card>
      <LoadingSpinner label="Loading data" />
      <ErrorMessage
        message="Failed to load Pokemon details."
        onRetry={() => undefined}
      />
    </YStack>
  );
}
