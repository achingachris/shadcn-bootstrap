export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  venue: string
  price: {
    min: number
    max: number
    currency: string
  }
  image: string
  category: string
  organizer: string
  capacity: number
  attendees: number
  tags: string[]
  featured: boolean
  status: "upcoming" | "ongoing" | "completed" | "cancelled"
  verified: boolean
}

export const mockEvents: Event[] = [
  {
    id: "1",
    title: "East Africa Music Festival",
    description:
      "Join us for the biggest music festival in East Africa featuring top artists from Kenya, Tanzania, Uganda, and beyond. Experience three days of incredible performances, cultural exhibitions, and unforgettable memories.",
    date: "2025-03-15",
    time: "18:00",
    location: "Nairobi, Kenya",
    venue: "Uhuru Gardens",
    price: { min: 25, max: 150, currency: "USD" },
    image: "/music-festival-stage-with-colorful-lights.png",
    category: "Music",
    organizer: "East Africa Entertainment",
    capacity: 5000,
    attendees: 2500,
    tags: ["music", "festival", "outdoor", "multi-day"],
    featured: true,
    status: "upcoming",
    verified: true,
  },
  {
    id: "2",
    title: "Tech Innovation Summit 2025",
    description:
      "Discover the latest in technology and innovation across East Africa. Network with industry leaders, attend workshops, and explore cutting-edge solutions shaping our digital future.",
    date: "2025-04-08",
    time: "09:00",
    location: "Dar es Salaam, Tanzania",
    venue: "Julius Nyerere Convention Centre",
    price: { min: 50, max: 200, currency: "USD" },
    image: "/modern-tech-conference-with-speakers.png",
    category: "Business",
    organizer: "Tech East Africa",
    capacity: 1000,
    attendees: 800,
    tags: ["technology", "innovation", "networking", "conference"],
    featured: true,
    status: "upcoming",
    verified: true,
  },
  {
    id: "3",
    title: "Cultural Heritage Celebration",
    description:
      "Celebrate the rich cultural heritage of East Africa with traditional music, dance, art exhibitions, and authentic cuisine from across the region.",
    date: "2025-05-20",
    time: "14:00",
    location: "Kampala, Uganda",
    venue: "National Theatre",
    price: { min: 15, max: 50, currency: "USD" },
    image: "/traditional-african-cultural-celebration.png",
    category: "Culture",
    organizer: "Cultural Heritage Foundation",
    capacity: 2000,
    attendees: 1200,
    tags: ["culture", "heritage", "traditional", "family-friendly"],
    featured: true,
    status: "upcoming",
    verified: true,
  },
  {
    id: "4",
    title: "Startup Pitch Competition",
    description:
      "Watch innovative startups pitch their ideas to top investors and industry experts. Network with entrepreneurs and discover the next big thing in East African business.",
    date: "2025-03-25",
    time: "10:00",
    location: "Kigali, Rwanda",
    venue: "Kigali Convention Centre",
    price: { min: 30, max: 100, currency: "USD" },
    image: "/startup-pitch-competition-stage.png",
    category: "Business",
    organizer: "Rwanda Startup Hub",
    capacity: 500,
    attendees: 350,
    tags: ["startup", "pitch", "investment", "networking"],
    featured: false,
    status: "upcoming",
    verified: false,
  },
  {
    id: "5",
    title: "East African Food Festival",
    description:
      "Taste the diverse flavors of East Africa in one location. From Ethiopian injera to Kenyan nyama choma, experience the culinary richness of our region.",
    date: "2025-04-15",
    time: "12:00",
    location: "Arusha, Tanzania",
    venue: "Arusha Cultural Centre",
    price: { min: 20, max: 60, currency: "USD" },
    image: "/east-african-food-festival-colorful-dishes.png",
    category: "Food",
    organizer: "Culinary East Africa",
    capacity: 1500,
    attendees: 900,
    tags: ["food", "culture", "family-friendly", "outdoor"],
    featured: false,
    status: "upcoming",
    verified: true,
  },
  {
    id: "6",
    title: "Digital Marketing Masterclass",
    description:
      "Learn from industry experts about the latest digital marketing strategies, social media trends, and growth hacking techniques for East African markets.",
    date: "2025-03-30",
    time: "09:30",
    location: "Nairobi, Kenya",
    venue: "Strathmore University",
    price: { min: 40, max: 120, currency: "USD" },
    image: "/digital-marketing-workshop-presentation.png",
    category: "Education",
    organizer: "Digital Skills Academy",
    capacity: 300,
    attendees: 250,
    tags: ["marketing", "digital", "workshop", "professional"],
    featured: false,
    status: "upcoming",
    verified: false,
  },
]

export const categories = ["All", "Music", "Business", "Culture", "Food", "Education", "Sports", "Technology", "Art"]

export const locations = [
  "All Locations",
  "Nairobi, Kenya",
  "Dar es Salaam, Tanzania",
  "Kampala, Uganda",
  "Kigali, Rwanda",
  "Arusha, Tanzania",
  "Mombasa, Kenya",
]
