import { NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { signToken } from '@/lib/auth'

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

    const token = signToken({ sub: user.id, email: user.email, role: user.role })

    const { password: _, ...userWithoutPassword } = user.get()

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
    })

    return NextResponse.json({ message: "Connexion réussie.", token, user: userWithoutPassword })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Erreur lors de la connexion." }, { status: 500 })
  }
}
