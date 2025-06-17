import { NextResponse } from "next/server"
import { User } from "@/lib/models/User"
import { sequelize } from "@/lib/db"

export async function POST(req: Request) {
  const { userId, amount } = await req.json()

  if (!userId || !amount) {
    return NextResponse.json({ message: "userId et amount requis." }, { status: 400 })
  }

  await sequelize.sync()

  const user = await User.findByPk(userId)
  if (!user) {
    return NextResponse.json({ message: "Utilisateur introuvable." }, { status: 404 })
  }

  const pointsEarned = Math.floor(amount * 0.1)
  user.loyaltyPoints = (user.loyaltyPoints || 0) + pointsEarned
  await user.save()

  return NextResponse.json({
    message: `+${pointsEarned} points ajoutés`,
    loyaltyPoints: user.loyaltyPoints,
  })
}
