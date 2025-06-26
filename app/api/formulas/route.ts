import { NextResponse } from "next/server"
import { Formula } from "@/lib/models/Formula"
import { sequelize } from "@/lib/db"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
    const formulas = await Formula.findAll()
    return NextResponse.json(formulas)
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

    if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Format invalide" }, { status: 400 })
    }

    for (const f of data) {
        await Formula.update(
            {
                name: f.name,
                price: f.price,
                description: f.description,
            },
            { where: { id: f.id } }
        )
    }

    return NextResponse.json({ message: "Formules mises à jour." })
}
