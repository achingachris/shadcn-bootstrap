export interface Artist {
  id: string
  name: string
  bio: string
  image: string
  genre: string[]
  location: string
  verified: boolean
  followers: number
  upcomingEvents: number
  socialMedia: {
    instagram?: string
    twitter?: string
    facebook?: string
    website?: string
  }
  featured: boolean
}

export interface Organizer {
  id: string
  name: string
  description: string
  image: string
  type: "company" | "individual" | "nonprofit"
  location: string
  verified: boolean
  eventsOrganized: number
  totalAttendees: number
  specialties: string[]
  contact: {
    email?: string
    phone?: string
    website?: string
  }
  featured: boolean
}

export const mockArtists: Artist[] = [
  {
    id: "1",
    name: "Amara Kone",
    bio: "Renowned Afrobeat artist from Mali, blending traditional West African rhythms with contemporary sounds. Known for powerful vocals and energetic live performances.",
    image: "/professional-african-woman-smiling.png",
    genre: ["Afrobeat", "World Music", "Traditional"],
    location: "Nairobi, Kenya",
    verified: true,
    followers: 45000,
    upcomingEvents: 3,
    socialMedia: {
      instagram: "@amarakone",
      twitter: "@amarakone_music",
      website: "https://amarakone.com",
    },
    featured: true,
  },
  {
    id: "2",
    name: "The Savanna Collective",
    bio: "A dynamic group of musicians from across East Africa, creating fusion music that celebrates the diversity of African culture and modern influences.",
    image: "/vibrant-african-event-celebration-with-people-danc.png",
    genre: ["Fusion", "Contemporary", "African"],
    location: "Dar es Salaam, Tanzania",
    verified: true,
    followers: 32000,
    upcomingEvents: 2,
    socialMedia: {
      instagram: "@savannacollective",
      facebook: "SavannaCollectiveMusic",
      website: "https://savannacollective.com",
    },
    featured: true,
  },
  {
    id: "3",
    name: "DJ Kigali",
    bio: "Electronic music producer and DJ specializing in Afro-house and electronic dance music. Regular performer at major festivals across East Africa.",
    image: "/professional-african-woman-smiling.png",
    genre: ["Electronic", "Afro-house", "Dance"],
    location: "Kigali, Rwanda",
    verified: false,
    followers: 18000,
    upcomingEvents: 4,
    socialMedia: {
      instagram: "@djkigali",
      twitter: "@djkigali_beats",
    },
    featured: false,
  },
  {
    id: "4",
    name: "Mama Zawadi",
    bio: "Traditional storyteller and cultural performer, preserving and sharing East African folklore through music, dance, and spoken word performances.",
    image: "/professional-african-woman-smiling.png",
    genre: ["Traditional", "Spoken Word", "Cultural"],
    location: "Kampala, Uganda",
    verified: true,
    followers: 12000,
    upcomingEvents: 1,
    socialMedia: {
      facebook: "MamaZawadiStories",
      website: "https://mamazawadi.org",
    },
    featured: false,
  },
]

export const mockOrganizers: Organizer[] = [
  {
    id: "1",
    name: "East Africa Entertainment",
    description:
      "Leading event management company specializing in large-scale music festivals and cultural celebrations across East Africa.",
    image: "/modern-tech-conference-with-speakers.png",
    type: "company",
    location: "Nairobi, Kenya",
    verified: true,
    eventsOrganized: 45,
    totalAttendees: 125000,
    specialties: ["Music Festivals", "Cultural Events", "Large Venues"],
    contact: {
      email: "info@eastafricaent.com",
      phone: "+254-700-123456",
      website: "https://eastafricaentertainment.com",
    },
    featured: true,
  },
  {
    id: "2",
    name: "Tech East Africa",
    description:
      "Premier technology conference organizer, bringing together innovators, entrepreneurs, and tech leaders from across the continent.",
    image: "/modern-tech-conference-with-speakers.png",
    type: "company",
    location: "Dar es Salaam, Tanzania",
    verified: true,
    eventsOrganized: 28,
    totalAttendees: 35000,
    specialties: ["Technology Conferences", "Startup Events", "Networking"],
    contact: {
      email: "hello@techeastafrica.com",
      website: "https://techeastafrica.com",
    },
    featured: true,
  },
  {
    id: "3",
    name: "Cultural Heritage Foundation",
    description:
      "Non-profit organization dedicated to preserving and promoting East African cultural heritage through educational events and celebrations.",
    image: "/traditional-african-cultural-celebration.png",
    type: "nonprofit",
    location: "Kampala, Uganda",
    verified: true,
    eventsOrganized: 67,
    totalAttendees: 89000,
    specialties: ["Cultural Events", "Educational Programs", "Heritage Preservation"],
    contact: {
      email: "contact@culturalheritage.org",
      website: "https://culturalheritage.org",
    },
    featured: false,
  },
  {
    id: "4",
    name: "Sarah Mwangi",
    description:
      "Independent event planner specializing in intimate cultural experiences and community-focused events throughout Kenya.",
    image: "/professional-african-woman-smiling.png",
    type: "individual",
    location: "Mombasa, Kenya",
    verified: false,
    eventsOrganized: 23,
    totalAttendees: 8500,
    specialties: ["Community Events", "Cultural Experiences", "Small Venues"],
    contact: {
      email: "sarah@eventsbysarah.co.ke",
      phone: "+254-722-987654",
    },
    featured: false,
  },
]

export const artistGenres = [
  "All",
  "Afrobeat",
  "World Music",
  "Traditional",
  "Electronic",
  "Fusion",
  "Contemporary",
  "Dance",
  "Spoken Word",
  "Cultural",
]

export const organizerTypes = ["All", "Company", "Individual", "Nonprofit"]

export const organizerSpecialties = [
  "All",
  "Music Festivals",
  "Cultural Events",
  "Technology Conferences",
  "Startup Events",
  "Educational Programs",
  "Community Events",
  "Large Venues",
  "Small Venues",
  "Networking",
]
