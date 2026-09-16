"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, bookCtaHref } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const isHome = pathname === "/";
  const transparent = false;

  return (
    <>
      <header
        className={`site-head ${transparent ? "is-transparent" : "is-solid"}`}
      >
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="site-wordmark" aria-label="SRJ International, home">
          SRJ International
        </Link>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-text={link.label}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`nav-link ${isActive(link.href) ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-nav-actions">
          <a href={bookCtaHref} className="nav-cta">
            Book a call
            <span aria-hidden="true">›</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            <span className={`nav-toggle-bars ${open ? "is-open" : ""}`} />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <div className="mobile-menu-inner">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`mobile-link ${isActive(link.href) ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <a href={bookCtaHref} className="nav-cta mobile-cta">
            Book a discovery call
            <span aria-hidden="true">›</span>
          </a>
        </div>
      </div>
      </header>

      <div
        className={`mobile-scrim ${open ? "is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setOpenPath(null)}
      />

      {!isHome ? <div className="site-head-spacer" aria-hidden="true" /> : null}
    </>
  );
}
