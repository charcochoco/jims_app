'use client'
import { useEffect } from "react"

export default function RegisterPush({ userId }: { userId: string }) {
  useEffect(() => {
    const register = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.register('/sw.js')

        const existingSub = await registration.pushManager.getSubscription()

        const newSub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
        })

        const isDifferent = JSON.stringify(existingSub) !== JSON.stringify(newSub)

        if (!existingSub || isDifferent) {
          await fetch('/api/push/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, subscription: newSub }),
          })
        }
      }
    }

    register()
  }, [userId])

  return null
}
