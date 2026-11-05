import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import SiteShell from "./components/SiteShell";

export const metadata: Metadata = {
  title: "OneTribe | Discover Events & Get Tickets",
  description:
    "Discover the latest events in Kenya. Explore concerts, parties, festivals, sports and exclusive experiences. Find events, compare ticket options and book your tickets with OneTribe.",
  keywords: [
    "OneTribe",
    "Get Event Tickets",
    "Latest Events in Kenya",
    "Kenya Event Tickets",
    "Upcoming Events Kenya",
    "Concert Tickets Kenya",
    "Festival Tickets",
    "Party Tickets",
    "Event Discovery",
    "List an Event",
    "Event Promotion Kenya",
  ],
  applicationName: "OneTribe",
  openGraph: {
    title: "OneTribe | Tickets, Events & Experiences",
    description:
      "Discover what's happening. Find your next experience and get your tickets with OneTribe.",
    siteName: "OneTribe",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
