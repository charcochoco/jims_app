import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { verifyToken } from "@/lib/jwt"
import { User } from "@/lib/models/User"

export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const payload = await verifyToken(token)
    if (!payload) {
      return NextResponse.json({ message: "Token invalide." }, { status: 401 })
    }

    await User.destroy({ where: { id: payload.sub } })

    const response = NextResponse.json({ message: "Compte supprimé." })
    response.cookies.set("token", "", { maxAge: 0 })

    return response
  } catch (error) {
    console.error("Erreur delete-account:", error)
    return NextResponse.json({ message: "Erreur serveur." }, { status: 500 })
  }
}
