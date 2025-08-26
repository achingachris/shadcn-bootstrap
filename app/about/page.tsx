import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Globe, Award, Target, Lightbulb } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About HAAAFLA - Connecting East African Communities Through Events",
  description:
    "Learn about HAAAFLA's mission to connect communities across East Africa through amazing events. Discover our story, values, and the passionate team behind the platform.",
  keywords: [
    "about HAAAFLA",
    "East African events",
    "community platform",
    "event organizers",
    "cultural events",
    "team",
    "mission",
    "values",
    "event technology",
    "East Africa",
  ],
  openGraph: {
    title: "About HAAAFLA - Connecting East African Communities Through Events",
    description:
      "Learn about HAAAFLA's mission to connect communities across East Africa through amazing events. Discover our story, values, and passionate team.",
    type: "website",
    url: "/about",
    images: [
      {
        url: "/diverse-group-of-people-at-african-cultural-event.png",
        width: 1200,
        height: 630,
        alt: "HAAAFLA community gathering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About HAAAFLA - Connecting East African Communities Through Events",
    description: "Learn about HAAAFLA's mission to connect communities across East Africa through amazing events.",
    images: ["/diverse-group-of-people-at-african-cultural-event.png"],
  },
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Community First",
      description: "We believe in bringing people together through shared experiences and cultural celebrations.",
    },
    {
      icon: Globe,
      title: "Cultural Diversity",
      description: "Celebrating the rich tapestry of East African cultures and promoting cross-cultural understanding.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every event experience, from discovery to attendance.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously improving our platform with cutting-edge technology and user-centered design.",
    },
  ]

  const team = [
    {
      name: "Amara Ochieng",
      role: "Founder & CEO",
      image: "/professional-african-woman-smiling.png",
      bio: "Passionate about connecting communities through events and technology.",
    },
    {
      name: "Kwame Asante",
      role: "CTO",
      image: "/professional-african-man-glasses.png",
      bio: "Tech enthusiast building scalable solutions for event management.",
    },
    {
      name: "Zara Mwangi",
      role: "Head of Operations",
      image: "/professional-african-woman.png",
      bio: "Ensuring smooth operations and exceptional customer experiences.",
    },
  ]

  const stats = [
    { label: "Events Hosted", value: "10K+" },
    { label: "Happy Customers", value: "50K+" },
    { label: "Cities Covered", value: "25+" },
    { label: "Years of Experience", value: "5+" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HAAAFLA",
            description: "Events and ticketing platform connecting communities across East Africa",
            url: "https://haaafla.com",
            logo: "https://haaafla.com/icon-512x512.png",
            foundingDate: "2020",
            founder: [
              {
                "@type": "Person",
                name: "Amara Ochieng",
                jobTitle: "Founder & CEO",
              },
            ],
            employee: [
              {
                "@type": "Person",
                name: "Amara Ochieng",
                jobTitle: "Founder & CEO",
              },
              {
                "@type": "Person",
                name: "Kwame Asante",
                jobTitle: "CTO",
              },
              {
                "@type": "Person",
                name: "Zara Mwangi",
                jobTitle: "Head of Operations",
              },
            ],
            areaServed: {
              "@type": "Place",
              name: "East Africa",
            },
            sameAs: ["https://twitter.com/haaafla", "https://facebook.com/haaafla", "https://instagram.com/haaafla"],
          }),
        }}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              About HAAAFLA
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading tracking-tight">
              Ukiona vyaelea, jua vimeundwa
            </h1>
            <p className="text-xl text-muted-foreground">
              When you see things floating, know they have been made to float. At HAAAFLA, we create platforms for
              amazing events to flourish and connect communities across East Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold font-heading">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  HAAAFLA was born from a simple observation: East Africa is rich with vibrant cultures, talented
                  artists, innovative entrepreneurs, and passionate communities, yet finding and attending events
                  remained fragmented and challenging.
                </p>
                <p>
                  Founded in 2020, we set out to bridge this gap by creating a unified platform where event organizers
                  could reach their audiences and attendees could discover experiences that matter to them. Our name,
                  inspired by the Swahili wisdom "Ukiona vyaelea, jua vimeundwa," reflects our belief that great events
                  don't happen by accident—they are carefully crafted experiences.
                </p>
                <p>
                  Today, we're proud to serve thousands of event organizers and hundreds of thousands of attendees
                  across East Africa, facilitating connections that create lasting memories and strengthen communities.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/diverse-group-of-people-at-african-cultural-event.png"
                alt="Community gathering"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we serve our community.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{value.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals behind HAAAFLA's mission to connect communities through events.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">Our Mission</h2>
            <p className="text-xl opacity-90">
              To empower communities across East Africa by making event discovery and attendance seamless, accessible,
              and enjoyable for everyone. We believe that when people come together to share experiences, cultures
              flourish, businesses grow, and communities thrive.
            </p>
            <div className="flex items-center justify-center gap-8 mt-12">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6" />
                <span className="font-medium">Community Driven</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-6 w-6" />
                <span className="font-medium">Quality Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-6 w-6" />
                <span className="font-medium">Culturally Rich</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
