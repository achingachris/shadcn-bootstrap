import type { Metadata } from "next"
import EventsPageClient from "./EventsPageClient"

export const metadata: Metadata = {
  title: "Events - Discover Amazing Events Across East Africa",
  description:
    "Browse and book tickets for the best events in East Africa. Find music festivals, business conferences, cultural celebrations, tech meetups, and more on HAAAFLA.",
  keywords: [
    "events East Africa",
    "event tickets",
    "music festivals",
    "business conferences",
    "cultural events",
    "tech meetups",
    "Kenya events",
    "Tanzania events",
    "Uganda events",
    "event booking",
    "HAAAFLA events",
  ],
  openGraph: {
    title: "Events - Discover Amazing Events Across East Africa",
    description:
      "Browse and book tickets for the best events in East Africa. Find music festivals, business conferences, cultural celebrations, and more.",
    type: "website",
    url: "/events",
  },
  twitter: {
    card: "summary_large_image",
    title: "Events - Discover Amazing Events Across East Africa",
    description: "Browse and book tickets for the best events in East Africa.",
  },
  alternates: {
    canonical: "/events",
  },
}

export default function EventsPage() {
  return <EventsPageClient />
}
