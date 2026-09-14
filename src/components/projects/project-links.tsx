type ProjectLinksProps = {
  repositoryUrl?: string;
  demoUrl?: string;
};

export function ProjectLinks({ repositoryUrl, demoUrl }: ProjectLinksProps) {
  if (!repositoryUrl && !demoUrl) return null;

  return (
    <div className="project-actions" aria-label="プロジェクトリンク">
      {demoUrl ? (
        <a href={demoUrl} target="_blank" rel="noreferrer">デモを見る</a>
      ) : null}
      {repositoryUrl ? (
        <a href={repositoryUrl} target="_blank" rel="noreferrer">ソースを見る</a>
      ) : null}
    </div>
  );
}
