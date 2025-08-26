export interface UserTicket {
  id: string
  eventId: string
  eventTitle: string
  eventDate: string
  eventTime: string
  eventLocation: string
  eventImage: string
  ticketType: string
  quantity: number
  totalPrice: number
  status: "confirmed" | "pending" | "cancelled" | "used"
  purchaseDate: string
  qrCode: string
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  preferences: {
    categories: string[]
    locations: string[]
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
}

export const mockUserProfile: UserProfile = {
  id: "user-1",
  firstName: "Amara",
  lastName: "Ochieng",
  email: "amara.ochieng@example.com",
  phone: "+254 700 123 456",
  avatar: "/professional-african-woman-smiling.png",
  joinDate: "2024-01-15",
  preferences: {
    categories: ["Music", "Culture", "Business"],
    locations: ["Nairobi, Kenya", "Kampala, Uganda"],
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  },
}

export const mockUserTickets: UserTicket[] = [
  {
    id: "ticket-1",
    eventId: "1",
    eventTitle: "East Africa Music Festival",
    eventDate: "2025-03-15",
    eventTime: "18:00",
    eventLocation: "Nairobi, Kenya",
    eventImage: "/music-festival-stage-with-colorful-lights.png",
    ticketType: "General Admission",
    quantity: 2,
    totalPrice: 50,
    status: "confirmed",
    purchaseDate: "2025-02-10",
    qrCode: "QR123456789",
  },
  {
    id: "ticket-2",
    eventId: "2",
    eventTitle: "Tech Innovation Summit 2025",
    eventDate: "2025-04-08",
    eventTime: "09:00",
    eventLocation: "Dar es Salaam, Tanzania",
    eventImage: "/modern-tech-conference-with-speakers.png",
    ticketType: "VIP Pass",
    quantity: 1,
    totalPrice: 200,
    status: "confirmed",
    purchaseDate: "2025-02-15",
    qrCode: "QR987654321",
  },
  {
    id: "ticket-3",
    eventId: "3",
    eventTitle: "Cultural Heritage Celebration",
    eventDate: "2025-05-20",
    eventTime: "14:00",
    eventLocation: "Kampala, Uganda",
    eventImage: "/traditional-african-cultural-celebration.png",
    ticketType: "Family Pack",
    quantity: 4,
    totalPrice: 60,
    status: "pending",
    purchaseDate: "2025-02-20",
    qrCode: "QR456789123",
  },
]

export const mockFavoriteEvents = [
  {
    id: "4",
    title: "Startup Pitch Competition",
    date: "2025-03-25",
    location: "Kigali, Rwanda",
    image: "/startup-pitch-competition-stage.png",
    price: 30,
  },
  {
    id: "5",
    title: "East African Food Festival",
    date: "2025-04-15",
    location: "Arusha, Tanzania",
    image: "/east-african-food-festival-colorful-dishes.png",
    price: 20,
  },
]
