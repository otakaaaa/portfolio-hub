import type { ComponentPropsWithoutRef } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { isAllowedContentHref } from "@/domain/content-link";
import { rejectExecutableMdx } from "@/domain/safe-mdx";

function HeadingTwo(props: ComponentPropsWithoutRef<"h2">) {
  return <h2 {...props} />;
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return <p {...props} />;
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return <ul {...props} />;
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return <blockquote {...props} />;
}

function ContentLink({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      href={isAllowedContentHref(href) ? href : undefined}
      rel={href.startsWith("https://") ? "noreferrer" : undefined}
      {...props}
    />
  );
}

type ContentBodyProps = Readonly<{ source: string }>;

export function ContentBody({ source }: ContentBodyProps) {
  return (
    <div className="content-body">
      <MDXRemote
        source={source}
        options={{ mdxOptions: { remarkPlugins: [rejectExecutableMdx] } }}
        components={{
          h2: HeadingTwo,
          p: Paragraph,
          ul: UnorderedList,
          blockquote: Blockquote,
          a: ContentLink,
        }}
      />
    </div>
  );
}
