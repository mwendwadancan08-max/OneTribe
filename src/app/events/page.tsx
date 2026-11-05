"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./events.module.css";

type EventItem = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  day: string;
  month: string;
  venue: string;
  price: string;
  category: string;
  tag: string;
  theme: string;
  featured?: boolean;
};

const events: EventItem[] = [
  { id: "nairobi-after-dark", title: "NAIROBI AFTER DARK", subtitle: "The city comes alive", date: "SAT, 21 NOV", day: "21", month: "NOV", venue: "The Waterfront, Nairobi", price: "From KSh 1,000", category: "Nightlife", tag: "THIS WEEKEND", theme: "midnight", featured: true },
  { id: "tribe-live", title: "TRIBE LIVE", subtitle: "One stage. All the energy.", date: "FRI, 27 NOV", day: "27", month: "NOV", venue: "KICC, Nairobi", price: "From KSh 1,500", category: "Music", tag: "LIVE MUSIC", theme: "sunset", featured: true },
  { id: "afro-fusion-fest", title: "AFRO FUSION FEST", subtitle: "A celebration of sound", date: "SAT, 05 DEC", day: "05", month: "DEC", venue: "Uhuru Gardens, Nairobi", price: "From KSh 800", category: "Festivals", tag: "FESTIVAL", theme: "violet", featured: true },
  { id: "the-link-up", title: "THE LINK UP", subtitle: "Good people. Great music.", date: "SAT, 12 DEC", day: "12", month: "DEC", venue: "Kisumu Social Centre", price: "From KSh 500", category: "Nightlife", tag: "PARTY", theme: "blue" },
  { id: "creative-business-forum", title: "CREATIVE BUSINESS FORUM", subtitle: "Ideas into impact", date: "THU, 17 DEC", day: "17", month: "DEC", venue: "Sarit Expo Centre, Nairobi", price: "From KSh 2,000", category: "Business", tag: "NETWORKING", theme: "cream" },
  { id: "run-the-city", title: "RUN THE CITY", subtitle: "Move together", date: "SUN, 20 DEC", day: "20", month: "DEC", venue: "Kisii Sports Club", price: "From KSh 300", category: "Sports", tag: "COMMUNITY", theme: "lime" },
  { id: "soul-session", title: "THE SOUL SESSION", subtitle: "An evening of live music", date: "SAT, 09 JAN", day: "09", month: "JAN", venue: "The Alchemist, Nairobi", price: "From KSh 1,200", category: "Music", tag: "LIVE EXPERIENCE", theme: "rose" },
  { id: "art-in-motion", title: "ART IN MOTION", subtitle: "Where creativity meets culture", date: "SUN, 17 JAN", day: "17", month: "JAN", venue: "Alliance Française, Nairobi", price: "From KSh 600", category: "Arts", tag: "ART & CULTURE", theme: "mono" },
  { id: "coastline-weekender", title: "COASTLINE WEEKENDER", subtitle: "Escape into the rhythm", date: "SAT, 23 JAN", day: "23", month: "JAN", venue: "Nyali, Mombasa", price: "From KSh 1,800", category: "Festivals", tag: "GETAWAY", theme: "coast" },
  { id: "founders-table", title: "THE FOUNDERS TABLE", subtitle: "Meet. Share. Build.", date: "FRI, 29 JAN", day: "29", month: "JAN", venue: "Nairobi Garage, Nairobi", price: "From KSh 1,000", category: "Business", tag: "COMMUNITY", theme: "gold" },
];

const categories = ["All", "Music", "Nightlife", "Festivals", "Business", "Sports", "Arts"];

function EventPoster({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  return (
    <article className={`${styles.poster} ${styles[event.theme]} ${compact ? styles.compact : ""}`}>
      <div className={styles.posterTexture} />
      <div className={styles.posterTop}>
        <span className={styles.posterBrand}>ONE<span>TRIBE</span></span>
        <span className={styles.posterTag}>{event.tag}</span>
      </div>
      <div className={styles.posterArtwork} aria-hidden="true">
        <span className={styles.artRing} />
        <span className={styles.artDisc} />
        <span className={styles.artLine} />
      </div>
      <div className={styles.posterCopy}>
        <span className={styles.posterDate}>{event.date}</span>
        <h3>{event.title}</h3>
        <p>{event.subtitle}</p>
      </div>
      <div className={styles.posterBottom}>
        <span>{event.venue}</span>
        <span className={styles.posterDateBlock}><b>{event.day}</b><small>{event.month}</small></span>
      </div>
    </article>
  );
}

function EventCard({ event }: { event: EventItem }) {
  return (
    <article className={styles.eventCard}>
      <Link href={`/events/${event.id}`} className={styles.posterLink} aria-label={`View ${event.title}`}>
        <EventPoster event={event} compact />
      </Link>
      <div className={styles.eventInfo}>
        <div className={styles.eventMeta}><span>{event.category}</span><span>{event.date}</span></div>
        <h3>{event.title}</h3>
        <p>{event.venue}</p>
        <div className={styles.eventCardBottom}>
          <strong>{event.price}</strong>
          <Link href={`/checkout?event=${event.id}`} className={styles.buyButton}>Buy ticket <span>↗</span></Link>
        </div>
      </div>
    </article>
  );
}

function EventRail({ title, eyebrow, items, railId }: { title: string; eyebrow: string; items: EventItem[]; railId: string }) {
  const railRef = useRef<HTMLDivElement>(null);

  function moveRail() {
    if (!railRef.current) return;
    const rail = railRef.current;
    const firstCard = rail.querySelector<HTMLElement>(`[data-event-card="true"]`);
    const gap = 18;
    const amount = firstCard ? (firstCard.offsetWidth + gap) * 2 : rail.clientWidth;
    const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8;
    rail.scrollTo({ left: atEnd ? 0 : rail.scrollLeft + amount, behavior: "smooth" });
  }

  return (
    <section className={styles.railSection}>
      <div className={styles.sectionHeading}>
        <div><span className={styles.eyebrow}>{eyebrow}</span><h2>{title}</h2></div>
        <div className={styles.railControls}>
          <span className={styles.scrollHint}>SCROLL TO EXPLORE</span>
          <button type="button" onClick={moveRail} aria-label={`Show more ${title}`} className={styles.arrowButton}>→</button>
        </div>
      </div>
      <div className={styles.eventRail} id={railId} ref={railRef}>
        {items.map((event) => <div className={styles.railItem} data-event-card="true" key={event.id}><EventCard event={event} /></div>)}
      </div>
    </section>
  );
}

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = events.filter((event) => event.featured);
  const filteredEvents = activeCategory === "All" ? events : events.filter((event) => event.category === activeCategory);
  const heroTrack = useRef<HTMLDivElement>(null);
  const [activeHero, setActiveHero] = useState(0);
  const touchStartX = useRef<number | null>(null);

  function moveHero(direction: number) {
    const next = (activeHero + direction + featured.length) % featured.length;
    setActiveHero(next);
    heroTrack.current?.scrollTo({ left: next * (heroTrack.current.clientWidth * 0.62), behavior: "smooth" });
  }

  return (
    <main className={styles.eventsPage}>
      <section className={styles.eventsIntro}>
        <div className={styles.introCopy}>
          <span className={styles.eyebrow}>YOUR CITY. YOUR PEOPLE. YOUR MOMENT.</span>
          <h1>Find your <span>next experience.</span></h1>
          <p>From nights out to unforgettable live moments, find the events bringing people together.</p>
        </div>
        <div className={styles.introNote}><span className={styles.liveIndicator} /> THE TRIBE IS OUT THERE <b>01 / 07</b></div>
      </section>

      <section className={styles.spotlightSection} aria-label="Featured events">
        <div className={styles.spotlightHeading}><span className={styles.eyebrow}>IN THE SPOTLIGHT</span><span>FEATURED EXPERIENCES</span></div>
        <div className={styles.spiralStage}>
          <div className={styles.spiralTrack} ref={heroTrack} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const delta = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(delta) > 35) moveHero(delta < 0 ? 1 : -1); touchStartX.current = null; }}>
            {featured.map((event, index) => {
              const offset = (index - activeHero + featured.length) % featured.length;
              const position = offset === 0 ? "center" : offset === 1 ? "right" : "left";
              return (
                <button type="button" key={event.id} className={`${styles.spiralItem} ${styles[position]}`} onClick={() => { setActiveHero(index); heroTrack.current?.scrollTo({ left: index * (heroTrack.current.clientWidth * 0.62), behavior: "smooth" }); }} aria-label={`Feature ${event.title}`}>
                  <EventPoster event={event} />
                  <span className={styles.spiralCaption}>{event.title}</span>
                </button>
              );
            })}
          </div>
          <div className={styles.spiralArrows}>
            <button type="button" onClick={() => moveHero(-1)} aria-label="Previous featured event">←</button>
            <span>{String(activeHero + 1).padStart(2, "0")} <i>/</i> {String(featured.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => moveHero(1)} aria-label="Next featured event">→</button>
          </div>
        </div>
        <div className={styles.spotlightBuy}><span>Swipe or scroll to browse the featured line-up</span><Link href={`/checkout?event=${featured[activeHero].id}`} className={styles.buyButton}>Get tickets <span>↗</span></Link></div>
      </section>

      <div className={styles.contentWrap}>
        <EventRail title="Trending right now" eyebrow="THE TALK OF THE TRIBE" items={events.slice(0, 6)} railId="trending-events" />

        <section className={styles.categorySection}>
          <div className={styles.sectionHeading}>
            <div><span className={styles.eyebrow}>PICK YOUR KIND OF MOMENT</span><h2>Explore by category</h2></div>
            <span className={styles.scrollHint}>FIND YOUR SCENE</span>
          </div>
          <div className={styles.categoryFilters} aria-label="Filter events by category">
            {categories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? styles.activeFilter : ""}>{category}</button>)}
          </div>
          <div className={styles.categoryGrid}>
            {filteredEvents.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
          {filteredEvents.length === 0 && <p className={styles.emptyState}>More experiences are being added. Check back soon.</p>}
        </section>
      </div>
    </main>
  );
}
