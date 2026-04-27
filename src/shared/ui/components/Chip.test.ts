import assert from "node:assert/strict";
import test from "node:test";

import { getChipColors } from "./chipColors";

test("getChipColors uses the default shared chip colors when no type is provided", () => {
  assert.deepEqual(getChipColors({ selected: false }), {
    backgroundColor: "#E5E7EB",
    borderColor: "transparent",
    textColor: "#1F1F1F",
  });
});

test("getChipColors uses selected shared chip colors when selected without a type", () => {
  assert.deepEqual(getChipColors({ selected: true }), {
    backgroundColor: "#1F1F1F",
    borderColor: "#1F1F1F",
    textColor: "#FFFFFF",
  });
});

test("getChipColors uses Pokemon type token colors for unselected type chips", () => {
  assert.deepEqual(getChipColors({ pokemonType: "fire", selected: false }), {
    backgroundColor: "#FFFFFF",
    borderColor: "#EE8130",
    textColor: "#EE8130",
  });
});

test("getChipColors uses Pokemon type token colors for selected type chips", () => {
  assert.deepEqual(getChipColors({ pokemonType: "water", selected: true }), {
    backgroundColor: "#6390F0",
    borderColor: "#6390F0",
    textColor: "#FFFFFF",
  });
});
