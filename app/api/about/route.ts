import { NextResponse } from "next/server"
import { AboutSection } from "@/lib/models/AboutSection"
import { sequelize } from "@/lib/db"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
    const sections = await AboutSection.findAll({ order: [["id", "ASC"]] })
    return NextResponse.json(sections)
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

    if (!Array.isArray(data) || data.length !== 3) {
        return NextResponse.json({ error: "Il faut exactement 3 sections." }, { status: 400 })
    }

    for (let i = 0; i < 3; i++) {
        await AboutSection.update(
            { title: data[i].title, description: data[i].description },
            { where: { id: i + 1 } }
        )
    }

    return NextResponse.json({ message: "Sections à propos mises à jour." })
}
