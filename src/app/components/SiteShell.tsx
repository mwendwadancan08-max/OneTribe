"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type SiteShellProps = {
  children: ReactNode;
};

export default function SiteShell({ children }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="navbar">
        <Link
          href="/"
          className="brand"
          aria-label="OneTribe home"
          onClick={closeMenu}
        >
          <Image
            src="/logo.png"
            alt="OneTribe"
            width={170}
            height={65}
            priority
            className="brand-logo"
          />
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/" className="active-link">
            Home
          </Link>
          <Link href="/events">Explore Events</Link>
          <Link href="/#categories">Categories</Link>
        </nav>

        <div className="nav-actions">
          <Link href="/events" className="btn-primary nav-button">
            Get Tickets <span>→</span>
          </Link>
        </div>

        <button
          type="button"
          className={`hamburger ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="onetribe-menu"
        >
          <span className="menu-trigger-icon">MENU</span>
          <span className="menu-trigger-symbol" aria-hidden="true">
            {menuOpen ? "×" : "+"}
          </span>
        </button>

        {menuOpen && (
          <>
            <button
              type="button"
              className="menu-backdrop"
              aria-label="Close navigation menu"
              onClick={closeMenu}
            />

            <nav
              className="menu-dropdown"
              id="onetribe-menu"
              aria-label="More navigation"
            >
              <div className="menu-header">
                <span>ONETRIBE MENU</span>
                <button
                  type="button"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  ×
                </button>
              </div>

              <Link href="/" onClick={closeMenu}>
                <span>01</span>
                Home
              </Link>

              <Link href="/events" onClick={closeMenu}>
                <span>02</span>
                Explore Events
              </Link>

              <Link href="/#categories" onClick={closeMenu}>
                <span>03</span>
                Categories
              </Link>

              <div className="menu-divider" />

              <Link
                href="/events"
                className="menu-ticket-link"
                onClick={closeMenu}
              >
                <span>04</span>
                Get Tickets
                <strong>→</strong>
              </Link>

              <Link
                href="/list-event"
                className="menu-organiser-link"
                onClick={closeMenu}
              >
                <span>05</span>
                List Your Event
                <strong>↗</strong>
              </Link>

              <div className="menu-footer">
                DISCOVER. CONNECT. EXPERIENCE.
              </div>
            </nav>
          </>
        )}
      </header>

      <div className="site-content">{children}</div>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" onClick={closeMenu} aria-label="OneTribe home">
              <Image
                src="/logo.png"
                alt="OneTribe"
                width={155}
                height={60}
                className="footer-logo"
              />
            </Link>

            <p>
              Discover what&apos;s happening. Find your people. Experience
              more together.
            </p>
          </div>

          <div className="footer-column">
            <h4>Discover</h4>
            <Link href="/">Home</Link>
            <Link href="/events">Explore Events</Link>
            <Link href="/#categories">Categories</Link>
            <Link href="/events">Get Tickets</Link>
          </div>

          <div className="footer-column">
            <h4>Organisers</h4>
            <Link href="/list-event">List Your Event</Link>
            <Link href="/list-event">Promote Your Event</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} OneTribe. All rights reserved.</p>
          <p>
            Designed and Managed by{" "}
            <span className="footer-credit">DBC.creatives</span>
          </p>
        </div>
      </footer>
    </>
  );
}
