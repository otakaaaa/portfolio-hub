type ProjectPreviewProps = Readonly<{
  title: string;
  previewUrl: string;
}>;

export function ProjectPreview({ title, previewUrl }: ProjectPreviewProps) {
  return (
    <section className="project-preview" aria-labelledby="preview-title">
      <div className="preview-toolbar">
        <div>
          <p className="section-kicker">INTERACTIVE PREVIEW</p>
          <h1 id="preview-title">{title}</h1>
        </div>
        <a href={previewUrl} target="_blank" rel="noreferrer">
          別タブで開く
        </a>
      </div>
      <p className="preview-notice">
        架空の静的JSONデータで動作するデモです。入力内容は本番サービスへ送信されません。
      </p>
      <div className="preview-frame-shell">
        <iframe
          src={previewUrl}
          title={`${title} 操作プレビュー`}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-forms allow-same-origin allow-downloads"
        />
      </div>
    </section>
  );
}
