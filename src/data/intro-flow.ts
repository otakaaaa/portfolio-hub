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
      message: "好きな質問を選んでください。",
      choices: [
        { id: "work", label: "何を作っている人？", nextNodeId: "work" },
        { id: "values", label: "何を大切にしている人？", nextNodeId: "values" },
        { id: "now", label: "いま学んでいることは何？", nextNodeId: "now" },
        { id: "ai", label: "AIを使って何を作れるか？", nextNodeId: "ai" },
      ],
    },
    work: {
      id: "work",
      speaker: "answer",
      message:
        "課題を理解し、仮説を立て、使う人がより満足できるようなWebアプリ開発をしています。企画から実装、検証まで一貫して行なっています。",
      choices: [
        { id: "values", label: "判断の軸を聞く", nextNodeId: "values" },
        { id: "now", label: "最近の学びを見る", nextNodeId: "now" },
      ],
    },
    values: {
      id: "values",
      speaker: "answer",
      message:
        "速く作ることと、後から直しやすいことの両方を大切にしています。小さく試し、記録し、検証結果から次を決めるようにしています。",
      choices: [
        { id: "work", label: "制作スタイルを見る", nextNodeId: "work" },
        { id: "now", label: "いまのテーマを聞く", nextNodeId: "now" },
      ],
    },
    now: {
      id: "now",
      speaker: "answer",
      message:
        "いまは、AIを使って世の中に新しい価値を生み出せないかを考え、試しています。",
      choices: [
        { id: "work", label: "作るものを聞く", nextNodeId: "work" },
        { id: "values", label: "大切なことを聞く", nextNodeId: "values" },
      ],
    },
    ai: {
      id: "ai",
      speaker: "answer",
      message:
        "基本的に想像できるものは全て作れます。得意なのは業務の全自動化を目指す設計、AIを使ってよりアプリを強固にする設計です。",
      choices: [
        { id: "work", label: "作るものを聞く", nextNodeId: "work" },
        { id: "values", label: "大切なことを聞く", nextNodeId: "values" },
      ],
    },
  },
};
