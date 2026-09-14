import type { IntroFlow } from "@/data/intro-flow";

export type IntroState = {
  currentNodeId: string;
  history: string[];
};

export function createIntroState(flow: IntroFlow): IntroState {
  if (!flow.nodes[flow.startNodeId]) {
    throw new Error("開始ノードが見つかりません");
  }

  return { currentNodeId: flow.startNodeId, history: [flow.startNodeId] };
}

export function transitionIntro(
  flow: IntroFlow,
  state: IntroState,
  choiceId: string,
): IntroState {
  const node = flow.nodes[state.currentNodeId];
  const choice = node?.choices.find((item) => item.id === choiceId);

  if (!choice || !flow.nodes[choice.nextNodeId]) {
    throw new Error("選択肢が見つかりません");
  }

  return {
    currentNodeId: choice.nextNodeId,
    history: [...state.history, choice.nextNodeId],
  };
}
