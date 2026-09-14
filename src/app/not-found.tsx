import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="section-kicker">404 / misplaced note</p>
      <h1>この記録は見つかりません。</h1>
      <p>URLが変わったか、まだ公開されていないようです。</p>
      <Link className="primary-link" href="/">トップへ戻る</Link>
    </section>
  );
}
