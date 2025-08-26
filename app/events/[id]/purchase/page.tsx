"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { mockEvents } from "@/lib/events-data"
import { ArrowLeft, Minus, Plus, CreditCard, Shield, Calendar, MapPin, Users } from "lucide-react"

interface PurchasePageProps {
  params: {
    id: string
  }
}

export default function PurchasePage({ params }: PurchasePageProps) {
  const router = useRouter()
  const event = mockEvents.find((e) => e.id === params.id)
  const [quantity, setQuantity] = useState(1)
  const [ticketType, setTicketType] = useState("general")
  const [step, setStep] = useState(1) // 1: tickets, 2: details, 3: payment

  if (!event) {
    return <div>Event not found</div>
  }

  const ticketTypes = [
    { id: "general", name: "General Admission", price: event.price.min, description: "Standard event access" },
    { id: "vip", name: "VIP Experience", price: event.price.max, description: "Premium access with perks" },
  ]

  const selectedTicketType = ticketTypes.find((t) => t.id === ticketType)
  const subtotal = (selectedTicketType?.price || 0) * quantity
  const fees = subtotal * 0.1 // 10% service fee
  const total = subtotal + fees

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handlePurchase = () => {
    // Simulate purchase process
    router.push(`/events/${params.id}/purchase/confirmation?total=${total}&quantity=${quantity}&type=${ticketType}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href={`/events/${params.id}`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Event
          </Link>
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? "bg-haaafla-emerald text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-0.5 mx-2 ${step > stepNum ? "bg-haaafla-emerald" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Tickets</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Ticket Types */}
                  <div className="space-y-4">
                    {ticketTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          ticketType === type.id
                            ? "border-haaafla-emerald bg-haaafla-emerald/5"
                            : "border-border hover:border-haaafla-emerald/50"
                        }`}
                        onClick={() => setTicketType(type.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{type.name}</h3>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold">${type.price}</div>
                            <div className="text-sm text-muted-foreground">per ticket</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <Label className="text-base font-medium">Quantity</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        disabled={quantity >= 10}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full" size="lg">
                    Continue to Details
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-1">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Name on Card</Label>
                    <Input id="cardName" placeholder="John Doe" />
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Shield className="h-4 w-4 text-haaafla-emerald" />
                    <span className="text-sm">Your payment information is secure and encrypted</span>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handlePurchase} className="flex-1 bg-haaafla-emerald hover:bg-haaafla-emerald/90">
                      Complete Purchase
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Event Info */}
                <div className="flex gap-3">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold line-clamp-2">{event.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {event.venue}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Ticket Details */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{selectedTicketType?.name}</span>
                    <span>${selectedTicketType?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Quantity: {quantity}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Service Fee</span>
                    <span>${fees.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Badge variant="outline" className="w-full justify-center">
                  <Users className="h-3 w-3 mr-1" />
                  {event.capacity - event.attendees} tickets remaining
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
