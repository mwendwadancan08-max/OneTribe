"use client";

import Link from "next/link";

const categories = [
  { name: "Music & Concerts", symbol: "♫" },
  { name: "Parties & Nightlife", symbol: "✦" },
  { name: "Festivals", symbol: "✺" },
  { name: "Business & Networking", symbol: "↗" },
  { name: "Sports", symbol: "◎" },
  { name: "Arts & Culture", symbol: "✳" },
];

export default function HomePage() {
  return (
    <main className="homepage">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-glow" />

        <div className="hero-content">
          <div className="hero-label">
            <span className="live-dot" />
            DISCOVER. CONNECT. EXPERIENCE.
          </div>

          <h1>
            One Tribe.
            <br />
            <span>Endless Experiences.</span>
          </h1>

          <p className="hero-description">
            From unforgettable concerts to vibrant festivals, exciting
            nightlife and meaningful connections — discover what&apos;s
            happening and be part of the experience.
          </p>

          <div className="hero-buttons">
            <Link href="/events" className="btn-primary">
              Get Tickets <span>→</span>
            </Link>

            <Link href="#categories" className="btn-outline">
              Explore Categories
            </Link>
          </div>

          <div className="hero-bottom">
            <div className="hero-stat">
              <strong>ONE Platform</strong>
              <span>Everything happening</span>
            </div>

            <div className="stat-divider" />

            <div className="hero-stat">
              <strong>ENDLESS Experiences</strong>
              <span>Discover something new</span>
            </div>

            <div className="stat-divider" />

            <div className="hero-stat">
              <strong>TOGETHER</strong>
              <span>Better moments</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          SCROLL TO EXPLORE <span />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">FIND YOUR SCENE</span>
            <h2>Explore by Category</h2>
          </div>

          <Link href="/events" className="text-link">
            View all events →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              href={`/events?category=${encodeURIComponent(category.name)}`}
              className="category-card"
              key={category.name}
            >
              <span className="category-icon" aria-hidden="true">
                {category.symbol}
              </span>

              <span>{category.name}</span>

              <span className="category-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ORGANISER PROMOTION */}
      <section className="promote-section">
        <div className="promote-content">
          <span className="section-eyebrow">FOR EVENT ORGANISERS</span>

          <h2>
            Make your event
            <br />
            the <span>next big thing.</span>
          </h2>

          <p>
            Put your event in front of the right audience. List your event
            with OneTribe and make it easier for people to discover and get
            tickets.
          </p>

          <Link href="/list-event" className="btn-primary">
            List Your Event <span>→</span>
          </Link>
        </div>

        <div className="promote-decoration" aria-hidden="true">
          OT
        </div>
      </section>
    </main>
  );
}
