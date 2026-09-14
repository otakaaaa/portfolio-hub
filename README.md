# Portfolio Hub

作ったものと、その途中で得た学びをひとつにつなぐポートフォリオです。選択式の自己紹介、プロジェクト検索、MDXによる制作・学習ログを備えています。

## 開発

Node.js 22.13以降を推奨します。

```bash
npm install
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開きます。

## 内容の差し替え

- 名前・紹介・外部リンク: `src/data/profile.ts`
- 自己紹介の質問フロー: `src/data/intro-flow.ts`
- プロジェクト: `content/projects/*.mdx`
- 学習・制作ログ: `content/logs/*.mdx`

各MDXのfrontmatterはZodで検証されます。ファイル名はURLのslugになるため、英小文字のkebab-caseで作成してください。

## 品質チェック

```bash
npm run lint
npm run typecheck
npm test
npm run test:coverage
npm run test:e2e
npm run build
```

E2Eを初めて実行するときは、先に `npx playwright install chromium` を実行してください。

## データ構成

画面は `PortfolioRepository` インターフェースを通してコンテンツを読みます。現在はローカルMDX実装ですが、将来はUIを変更せずSupabase実装へ差し替えられます。MVPではSupabase環境変数は不要です。

## 公開

Vercelへそのままデプロイできます。公開前に `src/data/profile.ts` の仮メールアドレスとGitHub URLを実際の情報へ変更してください。
