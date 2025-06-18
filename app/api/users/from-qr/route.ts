import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"

export async function GET(req: Request) {
  await sequelize.sync()
  const { searchParams } = new URL(req.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ message: "QR code manquant." }, { status: 400 })
  }

  const user = await User.findOne({ where: { qrCodeValue: code } })

  if (!user) {
    return NextResponse.json({ message: "Utilisateur non trouvé." }, { status: 404 })
  }

  const { password, ...safeUser } = user.get()
  return NextResponse.json({ user: safeUser })
}
