import { NextRequest, NextResponse } from "next/server"
import { getUserFromToken } from "@/lib/auth" 
import { LoyaltyTransaction } from "@/lib/models/LoyaltyTransaction"
import { cookies } from "next/headers"

export async function GET(req: NextRequest) {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const user = await getUserFromToken(token)

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const transactions = await LoyaltyTransaction.findAll({
        where: { userId: user.id },
        order: [["createdAt", "DESC"]],
    })

    return NextResponse.json({ transactions })
}
