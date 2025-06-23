'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    if (isMobile) {
      window.addEventListener("beforeinstallprompt", handler)
    }

    return () => {
      if (isMobile) {
        window.removeEventListener("beforeinstallprompt", handler)
      }
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === "accepted") {
        console.log("✅ Installation acceptée")
      } else {
        console.log("❌ Installation refusée")
      }
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  return showPrompt ? (
    <div className="fixed bottom-4 inset-x-4 bg-white shadow-lg border rounded-lg p-4 z-50">
      <p className="mb-2 text-sm">💡 Installez l'application pour un accès rapide et hors-ligne !</p>
      <Button onClick={handleInstall} className="w-full bg-orange-500 hover:bg-orange-600">
        Installer l'application
      </Button>
    </div>
  ) : null
}
