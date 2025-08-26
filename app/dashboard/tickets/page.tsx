import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, QrCode, Download, Eye } from "lucide-react"
import { mockUserTickets } from "@/lib/user-data"

export default function TicketsPage() {
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

  const upcomingTickets = mockUserTickets.filter((ticket) => new Date(ticket.eventDate) > new Date())
  const pastTickets = mockUserTickets.filter((ticket) => new Date(ticket.eventDate) <= new Date())

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      case "used":
        return "outline"
      default:
        return "secondary"
    }
  }

  const TicketCard = ({ ticket }: { ticket: any }) => (
    <Card className="overflow-hidden">
      <div className="flex">
        <img src={ticket.eventImage || "/placeholder.svg"} alt={ticket.eventTitle} className="w-32 h-32 object-cover" />
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{ticket.eventTitle}</h3>
              <div className="space-y-1">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(ticket.eventDate)} at {formatTime(ticket.eventTime)}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {ticket.eventLocation}
                </div>
              </div>
            </div>
            <Badge variant={getStatusColor(ticket.status)}>
              {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {ticket.ticketType} • {ticket.quantity} ticket{ticket.quantity > 1 ? "s" : ""}
              </p>
              <p className="font-semibold">${ticket.totalPrice}</p>
            </div>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View
              </Button>
              {ticket.status === "confirmed" && (
                <>
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4 mr-2" />
                    QR Code
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading">My Tickets</h1>
          <p className="text-muted-foreground">Manage your event tickets and bookings</p>
        </div>
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingTickets.length})</TabsTrigger>
          <TabsTrigger value="past">Past Events ({pastTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingTickets.length > 0 ? (
            upcomingTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
                <p className="text-muted-foreground mb-6">
                  Discover amazing events happening near you and book your tickets.
                </p>
                <Button asChild>
                  <Link href="/events">Browse Events</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastTickets.length > 0 ? (
            pastTickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No past events</h3>
                <p className="text-muted-foreground">Your attended events will appear here.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
