import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"
import { PushSubscription } from "@/lib/models/PushSubscription"
import { sendPushNotification } from "@/lib/push"

export async function POST(req: Request) {
  await sequelize.sync()
    
  const { userId, amount } = await req.json()

  if (!userId || !amount) {
    return NextResponse.json({ message: "userId et amount requis." }, { status: 400 })
  }

  const user = await User.findByPk(userId)
  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 })
  }

  const pointsEarned = Math.floor(amount * 0.1)
  user.loyaltyPoints = (user.loyaltyPoints || 0) + pointsEarned
  await user.save()
    
  const record = await PushSubscription.findOne({ where: { userId } })
    
  if (record) {
    const pushSub = record.get("subscription") 
    if (pushSub?.endpoint) {
        await sendPushNotification(pushSub, {
            title: "🎉 Points de fidélité gagnés !",
            body: `+${pointsEarned} points ajoutés à votre compte.`,
            icon: "/icon-192.png",
            url: "/loyalty",
        })
    }
  }

  return NextResponse.json({
    message: `+${pointsEarned} points ajoutés`,
    loyaltyPoints: user.loyaltyPoints,
  })
}
