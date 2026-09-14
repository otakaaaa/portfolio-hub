export type IntroChoice = {
  id: string;
  label: string;
  nextNodeId: string;
};

export type IntroNode = {
  id: string;
  speaker: "guide" | "answer";
  message: string;
  choices: IntroChoice[];
};

export type IntroFlow = {
  startNodeId: string;
  nodes: Record<string, IntroNode>;
};

export const introFlow: IntroFlow = {
  startNodeId: "start",
  nodes: {
    start: {
      id: "start",
      speaker: "guide",
      message: "どこから話しましょう？",
      choices: [
        { id: "work", label: "何を作る人？", nextNodeId: "work" },
        { id: "values", label: "大切にしていることは？", nextNodeId: "values" },
        { id: "now", label: "いま学んでいることは？", nextNodeId: "now" },
      ],
    },
    work: {
      id: "work",
      speaker: "answer",
      message:
        "課題を観察して、使う人が迷わない形へ整える人です。Webを中心に、企画から実装、検証まで一つの流れとして扱います。",
      choices: [
        { id: "values", label: "判断の軸を聞く", nextNodeId: "values" },
        { id: "now", label: "最近の学びを見る", nextNodeId: "now" },
      ],
    },
    values: {
      id: "values",
      speaker: "answer",
      message:
        "速く作ることと、後から直しやすいことの両方を大切にしています。小さく試し、記録し、検証結果から次を決めます。",
      choices: [
        { id: "work", label: "制作スタイルを見る", nextNodeId: "work" },
        { id: "now", label: "いまのテーマを聞く", nextNodeId: "now" },
      ],
    },
    now: {
      id: "now",
      speaker: "answer",
      message:
        "いまは、AIを機能として足すだけでなく、体験全体の中で自然に役立てる設計を学んでいます。このHubも、その実験場です。",
      choices: [
        { id: "work", label: "作るものを聞く", nextNodeId: "work" },
        { id: "values", label: "大切なことを聞く", nextNodeId: "values" },
      ],
    },
  },
};
