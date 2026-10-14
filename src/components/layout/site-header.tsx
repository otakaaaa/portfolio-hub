"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/projects", label: "プロジェクト" },
  { href: "/notes", label: "ノート" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="ホームへ戻る">
        <span className="brand-image">
          <Image src="/logo.gif" width={140} height={140} alt="" unoptimized />
        </span>
      </Link>
      <nav aria-label="メインナビゲーション">
        {navigation.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href || pathname.startsWith(`${href}/`) ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
