import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"
import type { Event } from "@/lib/events-data"

interface EventListItemProps {
  event: Event
}

export function EventListItem({ event }: EventListItemProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group hover:border-haaafla-emerald/30">
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Event Image */}
          <div className="relative flex-shrink-0 w-32 h-24 rounded-lg overflow-hidden">
            <img
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Event Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-haaafla-emerald/90 text-white hover:bg-haaafla-emerald text-xs">
                    {event.category}
                  </Badge>
                  {event.verified && (
                    <Badge className="bg-haaafla-teal/90 text-white hover:bg-haaafla-teal flex items-center gap-1 text-xs">
                      <CheckCircle className="h-2.5 w-2.5" />
                      Verified
                    </Badge>
                  )}
                  {event.featured && (
                    <Badge className="bg-haaafla-golden/90 text-black hover:bg-haaafla-golden text-xs">Featured</Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-haaafla-emerald transition-colors duration-300 mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{event.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg font-semibold text-primary group-hover:text-haaafla-emerald transition-colors duration-300 mb-2">
                  From ${event.price.min}
                </div>
                <Button
                  size="sm"
                  asChild
                  className="bg-haaafla-emerald hover:bg-haaafla-emerald/90 text-white group-hover:shadow-lg group-hover:shadow-haaafla-emerald/25 transition-all duration-300"
                >
                  <Link href={`/events/${event.id}`}>View Details</Link>
                </Button>
              </div>
            </div>

            {/* Event Meta */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center text-muted-foreground group-hover:text-haaafla-teal transition-colors duration-300">
                <Calendar className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center text-muted-foreground group-hover:text-haaafla-orange transition-colors duration-300">
                <Clock className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{formatTime(event.time)}</span>
              </div>
              <div className="flex items-center text-muted-foreground group-hover:text-haaafla-magenta transition-colors duration-300">
                <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center text-muted-foreground group-hover:text-haaafla-golden transition-colors duration-300">
                <Users className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                <span className="truncate">{event.attendees} attending</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
