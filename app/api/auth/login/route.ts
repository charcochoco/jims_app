import { NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(request: Request) {
  try {
    await sequelize.sync() 

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ message: "Email et mot de passe sont requis." }, { status: 400 })
    }

    const user = await User.findOne({ where: { email } })
    if (!user) {
      return NextResponse.json({ message: "Identifiants invalides." }, { status: 401 })
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: "Identifiants invalides." }, { status: 401 });
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    const { password: _, ...userWithoutPassword } = user.get()

    return NextResponse.json({ message: "Connexion réussie.", token, user: userWithoutPassword })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Erreur lors de la connexion." }, { status: 500 })
  }
}
