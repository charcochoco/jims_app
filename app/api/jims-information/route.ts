import { NextResponse } from "next/server"
import { JimsInformation } from "@/lib/models/JimsInformation"
import { sequelize } from "@/lib/db"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
  try {
    await sequelize.sync()
    const info = await JimsInformation.findOne()

    if (!info) {
      return NextResponse.json({ error: "Informations non trouvées" }, { status: 404 })
    }

    return NextResponse.json(info)
  } catch (error) {
    console.error("Erreur lors de la récupération des infos Jim’s:", error)
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
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

  const data = await req.json()

  const info = await JimsInformation.findOne()
  if (!info) {
    return NextResponse.json({ error: "Aucune information trouvée." }, { status: 404 })
  }

  await info.update(data)
  return NextResponse.json({ message: "Informations mises à jour." })
}
