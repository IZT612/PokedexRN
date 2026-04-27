import assert from "node:assert/strict";
import test from "node:test";

import { MAX_POKEMON_STAT_VALUE, getStatFillRatio } from "../statUtils";

test("getStatFillRatio returns zero for non-positive values", () => {
  assert.equal(getStatFillRatio(0), 0);
  assert.equal(getStatFillRatio(-5), 0);
});

test("getStatFillRatio normalizes mid-range stat values", () => {
  assert.equal(MAX_POKEMON_STAT_VALUE, 255);
  assert.equal(getStatFillRatio(123), 123 / 255);
});

test("getStatFillRatio clamps values above the max", () => {
  assert.equal(getStatFillRatio(255), 1);
  assert.equal(getStatFillRatio(300), 1);
});
