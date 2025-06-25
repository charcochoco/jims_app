import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import { getUserFromToken } from "@/lib/auth" 

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé." }, { status: 404 })
    }

    const { firstName, lastName, notifications, password } = await req.json()

    user.firstName = firstName ?? user.firstName
    user.lastName = lastName ?? user.lastName
    user.notifications = notifications ?? user.notifications

    if (password && password.length >= 8) {
      user.password = await bcrypt.hash(password, 10)
    }

    await user.save()

    return NextResponse.json({ message: "Profil mis à jour." })
  } catch (error) {
    console.error("Erreur update-profile:", error)
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 })
  }
}
