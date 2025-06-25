import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth" 
import { cookies } from "next/headers"

export async function GET(req: Request) {
  await sequelize.sync()

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) {
      return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
  }

  const userAdmin = await getUserFromToken(token)

  if (!userAdmin || userAdmin.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  
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
