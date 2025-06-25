import { NextRequest, NextResponse } from "next/server"
import { sequelize } from "@/lib/db"
import { User } from "@/lib/models/User"
import { LoyaltyTransaction } from "@/lib/models/LoyaltyTransaction"
import { getUserFromToken } from "@/lib/auth"
import { cookies } from "next/headers"
import { PushSubscription } from "@/lib/models/PushSubscription"
import { sendPushNotification } from "@/lib/push"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
    await sequelize.sync()

    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value
    if (!token) {
        return NextResponse.json({ message: "Non authentifié." }, { status: 401 })
    }

    const userAdmin = await getUserFromToken(token)
    if (!userAdmin || userAdmin.role !== "admin") {
        return NextResponse.json({ message: "Accès refusé." }, { status: 403 })
    }

    const { userId } = await req.json()
    if (!userId) return NextResponse.json({ message: "userId requis." }, { status: 400 })

    const user = await User.findByPk(userId)
    if (!user) return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 })

    if ((user.loyaltyPoints || 0) < 100) {
        return NextResponse.json({ message: "L'utilisateur n’a pas assez de points." }, { status: 400 })
    }

    user.loyaltyPoints = (user.loyaltyPoints || 0) - 100
    await user.save()

    await LoyaltyTransaction.create({
        userId: user.id,
        type: "debit",
        points: -100,
        orderId: null,
    })

    const record = await PushSubscription.findOne({ where: { userId } })

    if (record) {
        const pushSub = record.get("subscription")
        if (pushSub?.endpoint) {
            await sendPushNotification(pushSub, {
                title: "🎁 Menu offert !",
                body: "Vous avez utilisé 100 points pour un menu gratuit. Bon appétit 🍽️",
                icon: "/icon-192.png",
                url: "/account",
            })
        }
    }


    return NextResponse.json({
        message: "100 points déduits — menu offert 🎉",
        loyaltyPoints: user.loyaltyPoints,
    })
}
