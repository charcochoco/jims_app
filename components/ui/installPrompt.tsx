'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function InstallPrompt() {
  const [showiOSBanner, setShowiOSBanner] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showAndroidPrompt, setShowAndroidPrompt] = useState(false)

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator.standalone)

    if (isIos && !isInStandaloneMode) {
      setShowiOSBanner(true)
    }

    const isAndroid = /android/.test(navigator.userAgent.toLowerCase())
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowAndroidPrompt(true)
    }

    if (isAndroid) {
      window.addEventListener("beforeinstallprompt", handler)
    }

    return () => {
      if (isAndroid) {
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
      }
      setDeferredPrompt(null)
      setShowAndroidPrompt(false)
    }
  }

  return (
    <>
      {showAndroidPrompt && (
        <div className="fixed bottom-4 inset-x-4 bg-white shadow-lg border rounded-lg p-4 z-50">
          <p className="mb-2 text-sm">💡 Installez l'application pour un accès rapide et hors-ligne !</p>
          <Button onClick={handleInstall} className="w-full bg-orange-500 hover:bg-orange-600">
            Installer l'application
          </Button>
        </div>
      )}

      {showiOSBanner && (
        <div className="fixed bottom-4 inset-x-4 bg-white shadow-lg border rounded-lg p-4 z-50 text-center text-sm">
          📱 Pour installer cette app sur votre iPhone, appuyez sur le bouton <strong>Partager</strong> (en bas de l’écran),
          puis sélectionnez <strong>“Sur l’écran d’accueil”</strong>.
        </div>
      )}
    </>
  )
}
