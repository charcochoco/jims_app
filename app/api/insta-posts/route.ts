import { NextResponse } from "next/server"
import { InstaPost } from "@/lib/models/InstaPost"
import { sequelize } from "@/lib/db"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
    const posts = await InstaPost.findAll({ order: [["id", "ASC"]] })
    return NextResponse.json(posts)
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
        return NextResponse.json({ error: "Exactement 3 URLs requises" }, { status: 400 })
    }

    for (let i = 0; i < 3; i++) {
        await InstaPost.update({ url: data[i].url }, { where: { id: i + 1 } })
    }

    return NextResponse.json({ message: "Posts Instagram mis à jour." })
}
