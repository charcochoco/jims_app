import { NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { signToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    await sequelize.sync()

    const { firstName, lastName, email, password, acceptNotifications } = await request.json()

    if (!firstName || !lastName || !email || !password || !acceptNotifications) {
      return NextResponse.json({ message: "Nom, email et mot de passe sont requis." }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ message: "Le mot de passe doit contenir au moins 8 caractères." }, { status: 400 })
    }

    const existing = await User.findOne({ where: { email } })
    if (existing) {
      return NextResponse.json({ message: "Email déjà utilisé." }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "admin",
      loyaltyPoints: 0,
      notifications: acceptNotifications,
    })

    newUser.qrCodeValue = `user-${newUser.id}`
    await newUser.save()

    const token = await signToken({ sub: newUser.id, email: newUser.email, role: newUser.role })

    const { password: _, ...userData } = newUser.get()

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    })

    return NextResponse.json(
      { message: "Inscription réussie", user: userData, token },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Erreur lors de l'inscription." }, { status: 500 })
  }
}
