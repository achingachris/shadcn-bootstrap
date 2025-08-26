import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ticket, Heart, Calendar, TrendingUp, Clock, MapPin, ArrowRight } from "lucide-react"
import { mockUserTickets, mockFavoriteEvents, mockUserProfile } from "@/lib/user-data"

export default function DashboardPage() {
  const upcomingTickets = mockUserTickets.filter(
    (ticket) => new Date(ticket.eventDate) > new Date() && ticket.status === "confirmed",
  )
  const totalSpent = mockUserTickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0)
  const eventsAttended = mockUserTickets.filter((ticket) => ticket.status === "used").length

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
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">Welcome back, {mockUserProfile.firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your events</p>
        </div>
        <Avatar className="h-16 w-16">
          <AvatarImage src={mockUserProfile.avatar || "/placeholder.svg"} alt={mockUserProfile.firstName} />
          <AvatarFallback className="text-lg">
            {mockUserProfile.firstName[0]}
            {mockUserProfile.lastName[0]}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              Next event in{" "}
              {upcomingTickets.length > 0
                ? Math.ceil(
                    (new Date(upcomingTickets[0].eventDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                  )
                : 0}{" "}
              days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUserTickets.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockUserTickets.filter((t) => t.status === "confirmed").length} confirmed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favorites</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFavoriteEvents.length}</div>
            <p className="text-xs text-muted-foreground">Events you're interested in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent}</div>
            <p className="text-xs text-muted-foreground">On {mockUserTickets.length} events</p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your confirmed tickets for upcoming events</CardDescription>
          </div>
          <Button variant="outline" asChild>
            <Link href="/dashboard/tickets">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {upcomingTickets.length > 0 ? (
            <div className="space-y-4">
              {upcomingTickets.slice(0, 3).map((ticket) => (
                <div key={ticket.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <img
                    src={ticket.eventImage || "/placeholder.svg"}
                    alt={ticket.eventTitle}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{ticket.eventTitle}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(ticket.eventDate)} at {formatTime(ticket.eventTime)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {ticket.eventLocation}
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="default">Confirmed</Badge>
                    <p className="text-sm text-muted-foreground mt-1">
                      {ticket.quantity} ticket{ticket.quantity > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No upcoming events</h3>
              <p className="text-muted-foreground mb-4">Discover amazing events happening near you</p>
              <Button asChild>
                <Link href="/events">Browse Events</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions & Favorites */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your event experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" asChild>
              <Link href="/events">
                <Calendar className="h-4 w-4 mr-2" />
                Browse New Events
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/dashboard/tickets">
                <Ticket className="h-4 w-4 mr-2" />
                View My Tickets
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/dashboard/profile">
                <Clock className="h-4 w-4 mr-2" />
                Update Profile
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Favorite Events */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Favorite Events</CardTitle>
              <CardDescription>Events you're interested in</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/favorites">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {mockFavoriteEvents.length > 0 ? (
              <div className="space-y-3">
                {mockFavoriteEvents.slice(0, 2).map((event) => (
                  <div key={event.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{event.title}</h4>
                      <p className="text-xs text-muted-foreground">{formatDate(event.date)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-primary">From ${event.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Heart className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No favorite events yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
