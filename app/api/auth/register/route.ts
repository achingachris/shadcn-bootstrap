import { type NextRequest, NextResponse } from "next/server"
import { getUsers } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password, firstName, lastName, email } = await request.json()

    if (!username || !password || !firstName || !lastName || !email) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    const users = await getUsers()

    // Check if user already exists
    const existingUser = users.find((u) => u.username === username || u.email === email)
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 })
    }

    // For demo purposes, we'll just return success without actually writing to file
    // In a real app, you'd write the new user to the JSON file
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      firstName,
      lastName,
      email,
      phone: "",
      avatar: "/professional-african-woman-smiling.png",
      joinDate: new Date().toISOString().split("T")[0],
      role: "user",
    }

    // Create response with user data
    const response = NextResponse.json({ user: newUser })

    // Set session cookie
    response.cookies.set("user", JSON.stringify(newUser), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
