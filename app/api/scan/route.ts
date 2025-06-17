import { NextRequest, NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"

export async function POST(request: NextRequest) {
  try {
    await sequelize.sync()
    const { qrCodeValue } = await request.json()

    if (!qrCodeValue) {
      return NextResponse.json({ message: "QR code manquant" }, { status: 400 })
    }

    const user = await User.findOne({ where: { qrCodeValue } })

    if (!user) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    const { password, ...userData } = user.get()
    return NextResponse.json({ user: userData })
  } catch (error) {
    console.error("Erreur scan :", error)
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
