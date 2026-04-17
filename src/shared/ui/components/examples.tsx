// @ts-nocheck
import React from "react";
import { StyleSheet, View } from "react-native";

import { Button } from "./Button";
import { Card } from "./Card";
import { Chip } from "./Chip";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { SearchInput } from "./SearchInput";
import { uiTokens } from "./tokens";

export function SharedUiExamples() {
  return (
    <View style={styles.container}>
      <SearchInput
        value=""
        onChangeText={() => undefined}
        onSubmitQuery={() => undefined}
        placeholder="Search Pokemon"
        style={styles.item}
      />
      <Button
        label="Primary action"
        onPress={() => undefined}
        style={styles.item}
      />
      <Button label="Loading" loading style={styles.item} />
      <Card style={styles.item}>
        <Chip label="Electric" selected />
      </Card>
      <LoadingSpinner label="Loading data" />
      <ErrorMessage
        message="Failed to load Pokemon details."
        onRetry={() => undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: uiTokens.spacing.lg,
  },
  item: {
    marginBottom: uiTokens.spacing.md,
  },
});
