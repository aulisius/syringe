import assert from "node:assert";
import { beforeEach, describe, it } from "node:test";
import { SyringeSolution } from "./src/index.mjs";

var Syringe;
describe("`syringe` tests", () => {
  beforeEach(() => {
    Syringe = new SyringeSolution();
  });

  it("`inject` returns the correct value", () => {
    const injections = [
      { name: "host", uses: [], injectFn: () => "https://example.com" },
    ];
    Syringe.fill(injections);

    assert.strictEqual(Syringe.inject("host"), "https://example.com");
  });

  it("`inject` returns null when an injection is not available", () => {
    assert.strictEqual(Syringe.inject("host"), null);
  });

  it("`inject` works with nested dependencies", () => {
    const injections = [
      { name: "host", uses: [], injectFn: () => "https://example.com" },
      {
        name: "endpoints",
        uses: [{ name: "host" }],
        injectFn: ({ host }) => ({ url: host + "/" }),
      },
    ];
    Syringe.fill(injections);

    assert.deepStrictEqual(Syringe.inject("endpoints"), {
      url: "https://example.com/",
    });
  });
});
