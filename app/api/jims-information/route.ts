import { NextResponse } from "next/server"
import { JimsInformation } from "@/lib/models/JimsInformation"
import { sequelize } from "@/lib/db"

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
