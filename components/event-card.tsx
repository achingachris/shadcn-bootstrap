import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"
import type { Event } from "@/lib/events-data"

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
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
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group hover:border-haaafla-emerald/30 hover:-translate-y-1">
      <div className="relative">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-haaafla-emerald/90 text-white hover:bg-haaafla-emerald" variant="secondary">
            {event.category}
          </Badge>
          {event.verified && (
            <Badge className="bg-haaafla-teal/90 text-white hover:bg-haaafla-teal flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        {event.featured && (
          <Badge className="absolute top-3 right-3 bg-haaafla-golden/90 text-black hover:bg-haaafla-golden">
            Featured
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-haaafla-emerald transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-teal transition-colors duration-300">
            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-orange transition-colors duration-300">
            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{formatTime(event.time)}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-magenta transition-colors duration-300">
            <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground group-hover:text-haaafla-golden transition-colors duration-300">
            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
            <span>{event.attendees} attending</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-lg font-semibold text-primary group-hover:text-haaafla-emerald transition-colors duration-300">
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
      </CardContent>
    </Card>
  )
}
