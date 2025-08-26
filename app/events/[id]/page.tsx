import { notFound } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { mockEvents } from "@/lib/events-data"
import { Calendar, MapPin, Users, Share2, Heart, ArrowLeft, Building, Tag, Ticket } from "lucide-react"

interface EventPageProps {
  params: {
    id: string
  }
}

export default function EventPage({ params }: EventPageProps) {
  const event = mockEvents.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const availableTickets = event.capacity - event.attendees

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Back Button */}
      <div className="container py-4">
        <Button variant="ghost" asChild>
          <Link href="/events" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </Button>
      </div>

      {/* Event Header */}
      <section className="pb-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Image */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge variant="secondary">{event.category}</Badge>
                  {event.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="icon" variant="secondary">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        ${event.price.min}
                        {event.price.max > event.price.min && (
                          <span className="text-base text-muted-foreground"> - ${event.price.max}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">per ticket</p>
                    </div>
                    <Badge variant={availableTickets > 0 ? "default" : "destructive"}>
                      {availableTickets > 0 ? `${availableTickets} left` : "Sold Out"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{formatDate(event.date)}</p>
                        <p className="text-sm text-muted-foreground">{formatTime(event.time)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{event.venue}</p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{event.attendees} attending</p>
                        <p className="text-sm text-muted-foreground">of {event.capacity} capacity</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full" size="lg" disabled={availableTickets === 0} asChild>
                      {availableTickets > 0 ? (
                        <Link href={`/events/${event.id}/purchase`}>
                          <Ticket className="h-4 w-4 mr-2" />
                          Book Tickets
                        </Link>
                      ) : (
                        <span>
                          <Ticket className="h-4 w-4 mr-2" />
                          Sold Out
                        </span>
                      )}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      Add to Wishlist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-8">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold font-heading mb-4">{event.title}</h1>
                <p className="text-lg text-muted-foreground leading-relaxed">{event.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-xl font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Organizer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Event Organizer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{event.organizer}</p>
                      <p className="text-sm text-muted-foreground">Event Organizer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Event Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <Badge variant={event.status === "upcoming" ? "default" : "secondary"}>{event.status}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium">{event.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Capacity</span>
                    <span className="font-medium">{event.capacity}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="font-medium">
                      ${event.price.min} - ${event.price.max}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Similar Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Similar Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockEvents
                      .filter((e) => e.id !== event.id && e.category === event.category)
                      .slice(0, 3)
                      .map((similarEvent) => (
                        <Link key={similarEvent.id} href={`/events/${similarEvent.id}`}>
                          <div className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <img
                              src={similarEvent.image || "/placeholder.svg"}
                              alt={similarEvent.title}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm line-clamp-2">{similarEvent.title}</p>
                              <p className="text-xs text-muted-foreground">{formatDate(similarEvent.date)}</p>
                              <p className="text-xs text-primary font-medium">From ${similarEvent.price.min}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
