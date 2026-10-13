import Link from "next/link";

type ProjectLinksProps = {
  repositoryUrl?: string;
  demoUrl?: string;
  previewHref?: string;
};

export function ProjectLinks({ repositoryUrl, demoUrl, previewHref }: ProjectLinksProps) {
  if (!repositoryUrl && !demoUrl && !previewHref) return null;

  return (
    <div className="project-actions" aria-label="プロジェクトリンク">
      {previewHref ? <Link href={previewHref}>操作プレビュー</Link> : null}
      {demoUrl ? (
        <a href={demoUrl} target="_blank" rel="noreferrer">デモを見る</a>
      ) : null}
      {repositoryUrl ? (
        <a href={repositoryUrl} target="_blank" rel="noreferrer">ソースを見る</a>
      ) : null}
    </div>
  );
}
