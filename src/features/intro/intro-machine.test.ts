import { describe, expect, it } from "vitest";
import { introFlow } from "@/data/intro-flow";
import { createIntroState, transitionIntro } from "./intro-machine";

describe("intro machine", () => {
  it("starts with the opening prompt", () => {
    const state = createIntroState(introFlow);

    expect(state.currentNodeId).toBe("start");
    expect(state.history).toEqual(["start"]);
  });

  it("moves to the selected answer without mutating prior state", () => {
    const initial = createIntroState(introFlow);
    const next = transitionIntro(introFlow, initial, "work");

    expect(next.currentNodeId).toBe("work");
    expect(next.history).toEqual(["start", "work"]);
    expect(initial.history).toEqual(["start"]);
  });

  it("rejects a choice that is not available from the current node", () => {
    const state = createIntroState(introFlow);

    expect(() => transitionIntro(introFlow, state, "missing")).toThrow(
      "選択肢が見つかりません",
    );
  });

  it("rejects a flow without a valid start node", () => {
    expect(() => createIntroState({ ...introFlow, startNodeId: "missing" })).toThrow(
      "開始ノードが見つかりません",
    );
  });
});
