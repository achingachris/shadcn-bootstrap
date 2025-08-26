import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import {
  Calendar,
  MapPin,
  Users,
  Star,
  ArrowRight,
  Ticket,
  Search,
  Shield,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react"

export default function HomePage() {
  const featuredEvents = [
    {
      id: 1,
      title: "East Africa Music Festival",
      date: "March 15, 2025",
      location: "Nairobi, Kenya",
      price: "From $25",
      image: "/music-festival-stage-with-colorful-lights.png",
      category: "Music",
      attendees: 2500,
    },
    {
      id: 2,
      title: "Tech Innovation Summit",
      date: "April 8, 2025",
      location: "Dar es Salaam, Tanzania",
      price: "From $50",
      image: "/modern-tech-conference-with-speakers.png",
      category: "Business",
      attendees: 800,
    },
    {
      id: 3,
      title: "Cultural Heritage Celebration",
      date: "May 20, 2025",
      location: "Kampala, Uganda",
      price: "From $15",
      image: "/traditional-african-cultural-celebration.png",
      category: "Culture",
      attendees: 1200,
    },
  ]

  const features = [
    {
      icon: Search,
      title: "Discover Events",
      description: "Find amazing events happening near you with our powerful search and filtering tools.",
    },
    {
      icon: Ticket,
      title: "Easy Booking",
      description: "Book tickets instantly with our secure and user-friendly ticketing system.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Your transactions are protected with industry-leading security measures.",
    },
  ]

  return (
    <div className="viewport-safe bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-haaafla-emerald/5 via-background to-haaafla-golden/5"></div>
        <div className="absolute top-20 right-10 w-32 h-32 bg-haaafla-golden/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-haaafla-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-haaafla-emerald/5 rounded-full blur-3xl"></div>

        <div className="relative content-wrapper py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-haaafla-emerald/10 border border-haaafla-emerald/20 rounded-full">
                <Sparkles className="h-4 w-4 text-haaafla-emerald" />
                <span className="text-sm font-medium text-haaafla-emerald">East Africa's Premier Event Platform</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold font-heading tracking-tight leading-tight">
                  Where Events
                  <br />
                  Come{" "}
                  <span className="text-transparent bg-gradient-to-r from-haaafla-emerald to-haaafla-teal bg-clip-text">
                    Alive
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed">
                  <span className="font-medium text-haaafla-emerald italic">Ukiona vyaelea, jua vimeundwa.</span>
                  <br />
                  Discover, book, and experience the most incredible events across East Africa.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-haaafla-emerald to-haaafla-teal hover:from-haaafla-emerald/90 hover:to-haaafla-teal/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
                >
                  <Link href="/events">
                    <Search className="mr-2 h-5 w-5" />
                    Explore Events
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-haaafla-emerald text-haaafla-emerald hover:bg-haaafla-emerald hover:text-white bg-transparent text-lg px-8 py-6 transition-all duration-300"
                >
                  <Link href="/about">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="h-5 w-5 text-haaafla-teal" />
                    <span className="text-2xl lg:text-3xl font-bold text-haaafla-emerald">50K+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="h-5 w-5 fill-haaafla-golden text-haaafla-golden" />
                    <span className="text-2xl lg:text-3xl font-bold text-haaafla-emerald">4.9</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-haaafla-orange" />
                    <span className="text-2xl lg:text-3xl font-bold text-haaafla-emerald">1M+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Tickets Sold</p>
                </div>
              </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative z-10">
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/vibrant-african-event-celebration-with-people-danc.png"
                    alt="Event celebration"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-6 -left-6 bg-card border rounded-2xl p-4 shadow-xl backdrop-blur-sm bg-card/90 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-haaafla-emerald to-haaafla-teal rounded-full flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-haaafla-emerald">Next Event</p>
                      <p className="text-sm text-muted-foreground">March 15, 2025</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-card border rounded-2xl p-4 shadow-xl backdrop-blur-sm bg-card/90 transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-gradient-to-br from-haaafla-golden to-haaafla-orange rounded-full flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-haaafla-golden">Live Now</p>
                      <p className="text-sm text-muted-foreground">2,847 attending</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/4 -right-8 w-4 h-4 bg-haaafla-magenta rounded-full animate-pulse"></div>
                <div className="absolute bottom-1/3 -left-4 w-6 h-6 bg-haaafla-golden rounded-full animate-pulse delay-300"></div>
                <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-haaafla-teal rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="content-wrapper">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">Why Choose HAAAFLA?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make discovering and attending events simple, secure, and enjoyable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              const iconColors = ["text-haaafla-emerald", "text-haaafla-golden", "text-haaafla-teal"]
              const bgColors = ["bg-haaafla-emerald/10", "bg-haaafla-golden/10", "bg-haaafla-teal/10"]
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div
                      className={`mx-auto h-12 w-12 ${bgColors[index]} rounded-full flex items-center justify-center mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${iconColors[index]}`} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20">
        <div className="content-wrapper">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl font-bold font-heading">Featured Events</h2>
              <p className="text-muted-foreground">Don't miss these amazing upcoming events</p>
            </div>
            <Button
              variant="outline"
              asChild
              className="border-haaafla-emerald text-haaafla-emerald hover:bg-haaafla-emerald hover:text-white bg-transparent"
            >
              <Link href="/events">
                View All Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-3 left-3 bg-haaafla-golden text-black">{event.category}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2 text-haaafla-emerald" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2 text-haaafla-orange" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-haaafla-teal" />
                      {event.attendees} attending
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-haaafla-emerald">{event.price}</span>
                    <Button size="sm" asChild className="bg-haaafla-emerald hover:bg-haaafla-emerald/90">
                      <Link href={`/events/${event.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-haaafla-emerald text-white">
        <div className="content-wrapper text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">Ready to Get Started?</h2>
            <p className="text-xl opacity-90">
              Join thousands of event-goers who trust HAAAFLA for their entertainment needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild className="bg-white text-haaafla-emerald hover:bg-gray-100">
                <Link href="/signup">Create Account</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-haaafla-emerald"
                asChild
              >
                <Link href="/events">Browse Events</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
