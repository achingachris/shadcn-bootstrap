import { cookies } from "next/headers"

export interface User {
  id: string
  username: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  joinDate: string
  role: string
}

export async function getUsers(): Promise<User[]> {
  try {
    const fs = await import("fs/promises")
    const path = await import("path")
    const filePath = path.join(process.cwd(), "data", "users.json")
    const fileContent = await fs.readFile(filePath, "utf-8")
    const data = JSON.parse(fileContent)
    return data.users
  } catch (error) {
    console.error("Error reading users file:", error)
    return []
  }
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  const users = await getUsers()
  const user = users.find((u) => u.username === username && u.password === password)
  return user ? ({ ...user, password: undefined } as User) : null
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const userCookie = cookieStore.get("user")

    if (!userCookie) {
      return null
    }

    const userData = JSON.parse(userCookie.value)
    return userData
  } catch (error) {
    return null
  }
}

export function setUserSession(user: User) {
  const cookieStore = cookies()
  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export function clearUserSession() {
  const cookieStore = cookies()
  cookieStore.delete("user")
}
