import { compile } from "@mdx-js/mdx";
import type { Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const FORBIDDEN_NODE_TYPES = new Set([
  "html",
  "mdxFlowExpression",
  "mdxTextExpression",
  "mdxJsxFlowElement",
  "mdxJsxTextElement",
  "mdxjsEsm",
]);

export const rejectExecutableMdx: Plugin<[], Root> = () => (tree) => {
  visit(tree, (node) => {
    if (FORBIDDEN_NODE_TYPES.has(node.type)) {
      throw new Error("MDX本文にはHTML、JSX、JavaScript式を使用できません");
    }
  });
};

export async function assertSafeMdx(source: string): Promise<void> {
  await compile(source, { remarkPlugins: [rejectExecutableMdx] });
}
