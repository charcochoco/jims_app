import { sendPushNotification } from "@/lib/push"
import { PushSubscription } from "@/lib/models/PushSubscription"
import { NextResponse } from "next/server"
import { sequelize } from "@/lib/db"

export async function POST(req: Request) {
    await sequelize.sync()
  const { userId, message } = await req.json()

  const subscription = await PushSubscription.findOne({ where: { userId } })
  if (!subscription) {
    return NextResponse.json({ error: "Aucune subscription trouvée" }, { status: 404 })
  }

  await sendPushNotification(subscription, {
    title: "Notification Jim's",
    body: message,
    icon: "/icon-192.png",
    url: "/loyalty",
  })

  return NextResponse.json({ success: true })
}
