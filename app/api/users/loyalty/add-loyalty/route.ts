import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"
import { PushSubscription } from "@/lib/models/PushSubscription"
import { sendPushNotification } from "@/lib/push"
import { getUserFromToken } from "@/lib/auth" 
import { cookies } from "next/headers"
import { LoyaltyTransaction } from "@/lib/models/LoyaltyTransaction"

export async function POST(req: Request) {
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

  const { userId, amount } = await req.json()

  if (!userId || !amount) {
    return NextResponse.json({ message: "userId et amount requis." }, { status: 400 })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 })
  }

  const pointsEarned = Math.floor(amount)
  user.loyaltyPoints = (user.loyaltyPoints || 0) + pointsEarned
  await user.save()

  await LoyaltyTransaction.create({
    userId,
    type: "gain",
    points: pointsEarned,
  })

  // const record = await PushSubscription.findOne({ where: { userId } })

  // if (record) {
  //   const pushSub = record.get("subscription")
  //   if (pushSub?.endpoint) {
  //     await sendPushNotification(pushSub, {
  //       title: "🎉 Points de fidélité gagnés !",
  //       body: `+${pointsEarned} points ajoutés à votre compte.`,
  //       icon: "/icon-192.png",
  //       url: "/account",
  //     })
  //   }
  // }

  return NextResponse.json({
    message: `+${pointsEarned} points ajoutés`,
    loyaltyPoints: user.loyaltyPoints,
  })
}
