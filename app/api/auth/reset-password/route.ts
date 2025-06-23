import { NextRequest, NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"
import { User } from "@/lib/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  const { token, password } = await req.json()

  if (!token || !password) {
    return NextResponse.json({ message: "Token ou mot de passe manquant." }, { status: 400 })
  }

  try {
    const decoded = await verifyToken(token)

    if (!decoded) {
        return NextResponse.json({ message: "Token invalide ou expiré." }, { status: 400 })
    }

    const user = await User.findByPk(decoded.sub)

    if (!user) return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 })

    const hashed = await bcrypt.hash(password, 10)
    user.password = hashed
    await user.save()

    return NextResponse.json({ message: "Mot de passe mis à jour." })
  } catch (error) {
    return NextResponse.json({ message: "Lien invalide ou expiré." }, { status: 400 })
  }
}
