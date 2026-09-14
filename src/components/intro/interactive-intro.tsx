"use client";

import { useState } from "react";
import { introFlow } from "@/data/intro-flow";
import { createIntroState, transitionIntro } from "@/features/intro/intro-machine";

export function InteractiveIntro() {
  const [state, setState] = useState(() => createIntroState(introFlow));
  const currentNode = introFlow.nodes[state.currentNodeId];

  const choose = (choiceId: string) => {
    setState((current) => transitionIntro(introFlow, current, choiceId));
  };

  const restart = () => setState(createIntroState(introFlow));

  return (
    <section className="intro-panel" aria-labelledby="intro-title">
      <div className="intro-heading">
        <div>
          <p className="section-kicker">Interactive introduction</p>
          <h2 id="intro-title">質問から知る</h2>
        </div>
        {state.history.length > 1 ? (
          <button className="text-button" type="button" onClick={restart}>
            最初から見る
          </button>
        ) : null}
      </div>

      <div className="conversation" aria-live="polite">
        <p className="conversation-mark" aria-hidden="true">私</p>
        <p className="conversation-copy">{currentNode.message}</p>
      </div>

      <div className="choice-list" aria-label="質問を選ぶ">
        {currentNode.choices.map((choice) => (
          <button
            className="choice-button"
            key={`${currentNode.id}-${choice.id}`}
            type="button"
            onClick={() => choose(choice.id)}
          >
            <span>{choice.label}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
}
