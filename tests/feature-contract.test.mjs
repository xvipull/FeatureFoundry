import test from "node:test";
import assert from "node:assert/strict";

test("feature contracts define a timestamp and quality policy", async () => {
  const contract = await (await import("node:fs/promises")).readFile("ml/feature_contract.yaml", "utf8");
  assert.match(contract, /event_time: event_timestamp/);
  assert.match(contract, /freshness_minutes: 30/);
  assert.match(contract, /payment_failure_rate/);
});
