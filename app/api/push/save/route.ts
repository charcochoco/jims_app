import { NextResponse } from "next/server"
import { PushSubscription } from "@/lib/models/PushSubscription"
import { sequelize } from "@/lib/db"

export async function POST(req: Request) {
    console.log("test")
  await sequelize.sync() 

  const { userId, subscription } = await req.json()
console.log(userId)
  if (!userId || !subscription) {
    return NextResponse.json({ error: "userId et subscription requis" }, { status: 400 })
  }
  console.log(subscription)
  await PushSubscription.upsert({
    userId,
    subscription
  })

  return NextResponse.json({ success: true })
}
