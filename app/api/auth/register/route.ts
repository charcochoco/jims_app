import { NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    await sequelize.sync() 

    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
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
      name,
      email,
      password: hashedPassword,
      role: "user",
      loyaltyPoints: 0,
      qrCodeValue: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    })

    const token = jwt.sign(
      { sub: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    const { password: _, ...userData } = newUser.get()
    //const { ...userWithoutPassword } = newUser

    return NextResponse.json(
      { message: "Inscription réussie", user: userData, token },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Erreur lors de l'inscription." }, { status: 500 })
  }
}
