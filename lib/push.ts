import webPush from "web-push"

webPush.setVapidDetails(
  "mailto:romain.charcosset08@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

export async function sendPushNotification(subscription: any, payload: any) {
  await webPush.sendNotification(subscription, JSON.stringify(payload))
}
