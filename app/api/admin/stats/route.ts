// /app/api/admin/stats/route.ts
import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { LoyaltyTransaction } from "@/lib/models/LoyaltyTransaction"
import { sequelize } from "@/lib/db"
import { cookies } from "next/headers"
import { getUserFromToken } from "@/lib/auth"

export async function GET() {
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

    const totalUsers = await User.count()
    const totalPoints = await User.sum("loyaltyPoints")

    const transactions = await LoyaltyTransaction.findAll({
        attributes: [
            [sequelize.fn("DATE", sequelize.col("createdAt")), "date"],
            [sequelize.fn("SUM", sequelize.col("points")), "totalPoints"],
        ],
        group: [sequelize.fn("DATE", sequelize.col("createdAt"))],
        order: [[sequelize.fn("DATE", sequelize.col("createdAt")), "ASC"]],
        raw: true,
    })

    return NextResponse.json({ totalUsers, totalPoints, transactions })
}
