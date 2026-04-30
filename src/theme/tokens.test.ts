import assert from "node:assert/strict";
import test from "node:test";

import { getThemeColors, resolveAppThemeName } from "./tokens";

test("resolveAppThemeName maps dark device appearance to the dark theme", () => {
  assert.equal(resolveAppThemeName("dark"), "dark");
});

test("resolveAppThemeName falls back to the light theme for light and unknown appearance", () => {
  assert.equal(resolveAppThemeName("light"), "light");
  assert.equal(resolveAppThemeName(null), "light");
  assert.equal(resolveAppThemeName(undefined), "light");
});

test("getThemeColors returns distinct light and dark app surfaces", () => {
  const lightColors = getThemeColors("light");
  const darkColors = getThemeColors("dark");

  assert.equal(lightColors.background, "#F5F5F5");
  assert.equal(darkColors.background, "#111827");
  assert.equal(lightColors.surface, "#FFFFFF");
  assert.equal(darkColors.surface, "#1F2937");
  assert.equal(lightColors.types.fire, darkColors.types.fire);
});
