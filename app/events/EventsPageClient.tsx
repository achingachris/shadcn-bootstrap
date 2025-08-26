"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/event-card"
import { EventListItem } from "@/components/event-list-item"
import { EventFilters } from "@/components/event-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/events-data"
import { Calendar, List, LayoutGrid } from "lucide-react"

export default function EventsPageClient() {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    location: "All Locations",
    dateRange: "all",
    priceRange: "all",
  })

  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredEvents = useMemo(() => {
    const filtered = mockEvents.filter((event) => {
      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm) ||
          event.description.toLowerCase().includes(searchTerm) ||
          event.location.toLowerCase().includes(searchTerm) ||
          event.organizer.toLowerCase().includes(searchTerm) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm))

        if (!matchesSearch) return false
      }

      // Category filter
      if (filters.category !== "All" && event.category !== filters.category) {
        return false
      }

      // Location filter
      if (filters.location !== "All Locations" && event.location !== filters.location) {
        return false
      }

      // Price range filter
      if (filters.priceRange !== "all") {
        const [min, max] = filters.priceRange.split("-").map((p) => p.replace("+", "").replace("$", ""))
        const eventMinPrice = event.price.min

        if (filters.priceRange === "free" && eventMinPrice > 0) return false
        if (filters.priceRange === "0-25" && (eventMinPrice < 0 || eventMinPrice > 25)) return false
        if (filters.priceRange === "25-50" && (eventMinPrice < 25 || eventMinPrice > 50)) return false
        if (filters.priceRange === "50-100" && (eventMinPrice < 50 || eventMinPrice > 100)) return false
        if (filters.priceRange === "100+" && eventMinPrice < 100) return false
      }

      // Date range filter (simplified for demo)
      if (filters.dateRange !== "all") {
        const eventDate = new Date(event.date)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (filters.dateRange === "today" && eventDate.toDateString() !== today.toDateString()) return false
        if (filters.dateRange === "tomorrow" && eventDate.toDateString() !== tomorrow.toDateString()) return false
        // Add more date range logic as needed
      }

      return true
    })

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "price":
          return a.price.min - b.price.min
        case "popularity":
          return b.attendees - a.attendees
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [filters, sortBy])

  const featuredEvents = filteredEvents.filter((event) => event.featured)
  const regularEvents = filteredEvents.filter((event) => !event.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold font-heading mb-4">Discover Events</h1>
            <p className="text-xl text-muted-foreground">
              Find amazing events happening across East Africa. From music festivals to business conferences, there's
              something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <EventFilters onFiltersChange={setFilters} />
              </div>
            </div>

            {/* Events Grid */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold">{filteredEvents.length} Events Found</h2>
                  {(filters.search || filters.category !== "All" || filters.location !== "All Locations") && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Filtered by:</span>
                      {filters.search && <Badge variant="secondary">"{filters.search}"</Badge>}
                      {filters.category !== "All" && <Badge variant="secondary">{filters.category}</Badge>}
                      {filters.location !== "All Locations" && <Badge variant="secondary">{filters.location}</Badge>}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* View mode toggle buttons */}
                  <div className="flex items-center border rounded-lg p-1 bg-muted/50">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`h-8 px-3 ${
                        viewMode === "grid"
                          ? "bg-haaafla-emerald hover:bg-haaafla-emerald/90 text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      <LayoutGrid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`h-8 px-3 ${
                        viewMode === "list"
                          ? "bg-haaafla-emerald hover:bg-haaafla-emerald/90 text-white"
                          : "hover:bg-muted"
                      }`}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border rounded-md text-sm bg-background"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="price">Sort by Price</option>
                    <option value="popularity">Sort by Popularity</option>
                    <option value="name">Sort by Name</option>
                  </select>
                </div>
              </div>

              {/* Featured Events */}
              {featuredEvents.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2">
                    <span className="text-primary">★</span>
                    Featured Events
                  </h3>
                  {/* Conditional rendering based on view mode */}
                  {viewMode === "grid" ? (
                    <div className="grid md:grid-cols-2 gap-6">
                      {featuredEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {featuredEvents.map((event) => (
                        <EventListItem key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Regular Events */}
              {regularEvents.length > 0 && (
                <div>
                  {featuredEvents.length > 0 && <h3 className="text-2xl font-bold font-heading mb-6">All Events</h3>}
                  {/* Conditional rendering based on view mode */}
                  {viewMode === "grid" ? (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {regularEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {regularEvents.map((event) => (
                        <EventListItem key={event.id} event={event} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* No Results */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No events found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters or search terms to find more events.
                    </p>
                    <Button
                      onClick={() =>
                        setFilters({
                          search: "",
                          category: "All",
                          location: "All Locations",
                          dateRange: "all",
                          priceRange: "all",
                        })
                      }
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
