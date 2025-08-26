"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { mockEvents } from "@/lib/events-data"
import { CheckCircle, Download, Calendar, MapPin, Ticket, Share2, Home } from "lucide-react"

interface ConfirmationPageProps {
  params: {
    id: string
  }
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  const searchParams = useSearchParams()
  const event = mockEvents.find((e) => e.id === params.id)

  const total = searchParams.get("total") || "0"
  const quantity = searchParams.get("quantity") || "1"
  const ticketType = searchParams.get("type") || "general"

  if (!event) {
    return <div>Event not found</div>
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

  // Generate mock confirmation number
  const confirmationNumber = `HAAAFLA-${Date.now().toString().slice(-6)}`

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-haaafla-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-haaafla-emerald" />
            </div>
            <h1 className="text-3xl font-bold font-heading mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your tickets have been successfully purchased. Check your email for confirmation details.
            </p>
          </div>

          {/* Confirmation Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation Number</span>
                <span className="font-mono font-semibold">{confirmationNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Purchase Date</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-semibold">${Number.parseFloat(total).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Event Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(event.date)} at {formatTime(event.time)}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {event.venue}, {event.location}
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Ticket Type</span>
                  <span className="capitalize">{ticketType} Admission</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>
                    {quantity} ticket{Number.parseInt(quantity) > 1 ? "s" : ""}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Digital Tickets */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5" />
                Your Digital Tickets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: Number.parseInt(quantity) }, (_, i) => (
                  <div
                    key={i}
                    className="p-4 border border-dashed border-haaafla-emerald rounded-lg bg-haaafla-emerald/5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Ticket #{i + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          {confirmationNumber}-{(i + 1).toString().padStart(2, "0")}
                        </div>
                      </div>
                      <div className="w-16 h-16 bg-white border rounded-lg flex items-center justify-center">
                        <div className="text-xs text-center">
                          <div className="font-mono">QR</div>
                          <div className="font-mono">CODE</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Present these QR codes at the event entrance. Screenshots are acceptable.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Download Tickets
            </Button>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              Share Event
            </Button>
            <Button asChild className="bg-haaafla-emerald hover:bg-haaafla-emerald/90">
              <Link href="/dashboard" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go to Dashboard
              </Link>
            </Button>
          </div>

          {/* Next Steps */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-haaafla-emerald mt-0.5 flex-shrink-0" />
                  <span>Confirmation email sent to your registered email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-haaafla-emerald mt-0.5 flex-shrink-0" />
                  <span>Add the event to your calendar</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-haaafla-emerald mt-0.5 flex-shrink-0" />
                  <span>Arrive 30 minutes early for smooth entry</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-haaafla-emerald mt-0.5 flex-shrink-0" />
                  <span>Follow event updates on your dashboard</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
