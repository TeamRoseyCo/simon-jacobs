"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, bookHref } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-head">
      <span className="site-head-accent" aria-hidden="true" />
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="site-wordmark" aria-label="Simon Jacobs, home">
          Simon Jacobs
        </Link>

        <div className="site-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`nav-link ${isActive(link.href) ? "is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="site-nav-actions">
          <a href={bookHref} className="nav-cta">
            Book a call
            <span aria-hidden="true">→</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
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
          <a href={bookHref} className="nav-cta mobile-cta">
            Book a discovery call
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
