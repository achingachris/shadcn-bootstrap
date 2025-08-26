"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Scan, CheckCircle, XCircle, AlertTriangle, Calendar, MapPin, User, Ticket, Camera, Hash } from "lucide-react"

interface TicketData {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventVenue: string
  ticketType: string
  holderName: string
  holderEmail: string
  purchaseDate: string
  status: "valid" | "used" | "invalid"
  confirmationNumber: string
}

// Mock ticket database
const mockTickets: TicketData[] = [
  {
    id: "HAAAFLA-123456-01",
    eventId: "1",
    eventTitle: "East African Music Festival 2025",
    eventDate: "2025-03-15",
    eventTime: "18:00",
    eventVenue: "Uhuru Gardens",
    ticketType: "General Admission",
    holderName: "John Doe",
    holderEmail: "john@example.com",
    purchaseDate: "2025-01-15",
    status: "valid",
    confirmationNumber: "HAAAFLA-123456",
  },
  {
    id: "HAAAFLA-789012-01",
    eventId: "2",
    eventTitle: "Tech Innovation Summit",
    eventDate: "2025-02-20",
    eventTime: "09:00",
    eventVenue: "KICC",
    ticketType: "VIP Experience",
    holderName: "Jane Smith",
    holderEmail: "jane@example.com",
    purchaseDate: "2025-01-10",
    status: "used",
    confirmationNumber: "HAAAFLA-789012",
  },
]

export default function ValidatePage() {
  const [ticketInput, setTicketInput] = useState("")
  const [validatedTicket, setValidatedTicket] = useState<TicketData | null>(null)
  const [validationStatus, setValidationStatus] = useState<"idle" | "valid" | "used" | "invalid">("idle")
  const [isScanning, setIsScanning] = useState(false)

  const validateTicket = (ticketId: string) => {
    const ticket = mockTickets.find((t) => t.id === ticketId || t.confirmationNumber === ticketId)

    if (!ticket) {
      setValidationStatus("invalid")
      setValidatedTicket(null)
      return
    }

    setValidatedTicket(ticket)
    setValidationStatus(ticket.status)
  }

  const handleValidation = () => {
    if (!ticketInput.trim()) return
    validateTicket(ticketInput.trim())
  }

  const handleMarkAsUsed = () => {
    if (validatedTicket && validatedTicket.status === "valid") {
      // In a real app, this would update the database
      const updatedTicket = { ...validatedTicket, status: "used" as const }
      setValidatedTicket(updatedTicket)
      setValidationStatus("used")

      // Update mock data
      const ticketIndex = mockTickets.findIndex((t) => t.id === validatedTicket.id)
      if (ticketIndex !== -1) {
        mockTickets[ticketIndex].status = "used"
      }
    }
  }

  const simulateQRScan = () => {
    setIsScanning(true)
    // Simulate scanning delay
    setTimeout(() => {
      const randomTicket = mockTickets[Math.floor(Math.random() * mockTickets.length)]
      setTicketInput(randomTicket.id)
      validateTicket(randomTicket.id)
      setIsScanning(false)
    }, 2000)
  }

  const resetValidation = () => {
    setTicketInput("")
    setValidatedTicket(null)
    setValidationStatus("idle")
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-haaafla-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scan className="h-8 w-8 text-haaafla-emerald" />
            </div>
            <h1 className="text-3xl font-bold font-heading mb-2">Ticket Validation</h1>
            <p className="text-muted-foreground">Scan or enter ticket information to validate event entry</p>
          </div>

          {/* Validation Input */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Validate Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ticketInput">Ticket ID or Confirmation Number</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="ticketInput"
                    placeholder="Enter ticket ID or scan QR code"
                    value={ticketInput}
                    onChange={(e) => setTicketInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleValidation()}
                  />
                  <Button onClick={handleValidation} disabled={!ticketInput.trim()}>
                    <Hash className="h-4 w-4 mr-2" />
                    Validate
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1 border-t"></div>
                <span className="text-sm text-muted-foreground">OR</span>
                <div className="flex-1 border-t"></div>
              </div>

              <Button
                onClick={simulateQRScan}
                disabled={isScanning}
                className="w-full bg-haaafla-emerald hover:bg-haaafla-emerald/90"
                size="lg"
              >
                <Camera className="h-4 w-4 mr-2" />
                {isScanning ? "Scanning..." : "Scan QR Code"}
              </Button>

              {isScanning && (
                <div className="text-center py-4">
                  <div className="w-8 h-8 border-2 border-haaafla-emerald border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Scanning QR code...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Validation Result */}
          {validationStatus !== "idle" && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {validationStatus === "valid" && <CheckCircle className="h-5 w-5 text-green-500" />}
                  {validationStatus === "used" && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                  {validationStatus === "invalid" && <XCircle className="h-5 w-5 text-red-500" />}
                  Validation Result
                </CardTitle>
              </CardHeader>
              <CardContent>
                {validationStatus === "invalid" && (
                  <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-700 dark:text-red-300">
                      <strong>Invalid Ticket</strong> - This ticket was not found in our system. Please check the ticket
                      ID and try again.
                    </AlertDescription>
                  </Alert>
                )}

                {validatedTicket && validationStatus !== "invalid" && (
                  <div className="space-y-4">
                    {/* Status Alert */}
                    {validationStatus === "valid" && (
                      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription className="text-green-700 dark:text-green-300">
                          <strong>Valid Ticket</strong> - This ticket is authentic and ready for entry.
                        </AlertDescription>
                      </Alert>
                    )}

                    {validationStatus === "used" && (
                      <Alert className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                          <strong>Already Used</strong> - This ticket has already been validated and used for entry.
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Ticket Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Ticket className="h-5 w-5 text-haaafla-emerald" />
                        <div>
                          <p className="font-semibold">{validatedTicket.eventTitle}</p>
                          <p className="text-sm text-muted-foreground">Event</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatDate(validatedTicket.eventDate)}</p>
                          <p className="text-sm text-muted-foreground">{formatTime(validatedTicket.eventTime)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{validatedTicket.eventVenue}</p>
                          <p className="text-sm text-muted-foreground">Venue</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{validatedTicket.holderName}</p>
                          <p className="text-sm text-muted-foreground">{validatedTicket.holderEmail}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Ticket Type</p>
                          <p className="font-medium">{validatedTicket.ticketType}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Purchase Date</p>
                          <p className="font-medium">{formatDate(validatedTicket.purchaseDate)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ticket ID</p>
                          <p className="font-mono text-xs">{validatedTicket.id}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Status</p>
                          <Badge
                            variant={
                              validatedTicket.status === "valid"
                                ? "default"
                                : validatedTicket.status === "used"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {validatedTicket.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      {validationStatus === "valid" && (
                        <Button
                          onClick={handleMarkAsUsed}
                          className="flex-1 bg-haaafla-emerald hover:bg-haaafla-emerald/90"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark as Used
                        </Button>
                      )}
                      <Button variant="outline" onClick={resetValidation} className="flex-1 bg-transparent">
                        Validate Another
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Event Statistics</div>
                    <div className="text-sm text-muted-foreground">View validation stats</div>
                  </div>
                </Button>
                <Button variant="outline" className="justify-start h-auto p-4 bg-transparent">
                  <div className="text-left">
                    <div className="font-medium">Export Report</div>
                    <div className="text-sm text-muted-foreground">Download validation log</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Demo Instructions */}
          <Card className="mt-6 border-dashed">
            <CardHeader>
              <CardTitle className="text-sm">Demo Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p className="mb-2">Try these sample ticket IDs:</p>
              <ul className="space-y-1">
                <li>
                  • <code className="bg-muted px-1 rounded">HAAAFLA-123456-01</code> (Valid ticket)
                </li>
                <li>
                  • <code className="bg-muted px-1 rounded">HAAAFLA-789012-01</code> (Already used)
                </li>
                <li>
                  • <code className="bg-muted px-1 rounded">INVALID-TICKET</code> (Invalid ticket)
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
