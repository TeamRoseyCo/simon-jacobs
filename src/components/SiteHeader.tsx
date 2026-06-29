"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, bookHref } from "@/lib/content";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Track scroll so the header can fade from transparent (over the hero) to a
  // frosted "liquid glass" bar once the user moves down the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Transparent white-on-dark only while sitting over the home hero at the top;
  // everywhere else (scrolled, or any inner page) it's the solid glass bar.
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <>
      <header
        className={`site-head ${transparent ? "is-transparent" : "is-solid"}`}
      >
      <nav className="site-nav" aria-label="Main navigation">
        <Link href="/" className="site-wordmark" aria-label="Simon Jacobs, home">
          Simon Jacobs
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
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
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
          <a
            href={bookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta mobile-cta"
          >
            Book a discovery call
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      </header>
      {/* Dim the page behind the open mobile menu so hero copy does not peek
          beneath the dropdown. Tapping it closes the menu. */}
      <div
        className={`mobile-scrim ${open ? "is-open" : ""}`}
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      {/* Inner pages have no hero behind the fixed header, so reserve its height. */}
      {!isHome ? <div className="site-head-spacer" aria-hidden="true" /> : null}
    </>
  );
}
