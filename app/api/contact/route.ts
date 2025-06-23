import { NextRequest, NextResponse } from "next/server"
import { Contact } from "@/lib/models/Contact"
import { sequelize } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 })
    }

    await sequelize.sync()
    await Contact.create({ name, email, subject, message })

    return NextResponse.json({ success: true, message: "Message envoyé avec succès." })
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error)
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 })
  }
}
