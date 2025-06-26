// app/api/menu/route.ts
import { NextResponse } from "next/server"
import { MenuItem } from "@/lib/models/MenuItem"
import { sequelize } from "@/lib/db"
import { getUserFromToken } from "@/lib/auth"
import { cookies } from "next/headers"

export async function GET() {
    const items = await MenuItem.findAll({ order: [["category", "ASC"], ["id", "ASC"]] })
    return NextResponse.json(items)
}

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const user = await getUserFromToken(token)

    if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const item = await MenuItem.create(body)
    return NextResponse.json(item)
}

export async function PUT(req: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const user = await getUserFromToken(token)

    if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, ...data } = await req.json()
    await MenuItem.update(data, { where: { id } })
    return NextResponse.json({ message: "Item mis à jour" })
}

export async function DELETE(req: Request) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const user = await getUserFromToken(token)

    if (!user || user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await req.json()
    await MenuItem.destroy({ where: { id } })
    return NextResponse.json({ message: "Item supprimé" })
}
