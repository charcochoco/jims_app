'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export default function InstallPrompt() {
  const [showiOSBanner, setShowiOSBanner] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showAndroidPrompt, setShowAndroidPrompt] = useState(false)

  useEffect(() => {
    const isDismissed = localStorage.getItem("pwaPromptDismissed") === "true"
    if (isDismissed) return

    const isIos = /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase())
    const isInStandaloneMode = 'standalone' in window.navigator && window.navigator.standalone

    if (isIos && !isInStandaloneMode) {
      setShowiOSBanner(true)
    }

    const isAndroid = true
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
      } else {
        console.log("❌ Installation refusée")
        localStorage.setItem("pwaPromptDismissed", "true")
      }
      setDeferredPrompt(null)
      setShowAndroidPrompt(false)
    }
  }

  const handleDismiss = () => {
    localStorage.setItem("pwaPromptDismissed", "true")
    setShowAndroidPrompt(false)
    setShowiOSBanner(false)
  }

  return (
    <>
      {showAndroidPrompt && (
        <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 bg-white border shadow-md p-4 rounded-lg z-50 flex items-center justify-between max-w-sm mx-auto">
          <p className="text-sm mr-2">📲 Installer l’application sur votre appareil pour y accéder plus rapidement</p>
          <div className="flex gap-2">
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600" onClick={handleInstall}>
              Installer
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDismiss}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {showiOSBanner && (
        <div className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-4 bg-white border shadow-md p-4 rounded-lg z-50 max-w-sm mx-auto flex justify-between items-start gap-2">
          <p className="text-sm">
            📱 Pour installer cette app sur votre iPhone, appuyez sur le bouton <strong>Partager</strong> (en bas de l’écran depuis Safari), puis sélectionnez <strong>“Sur l’écran d’accueil”</strong>.
          </p>
          <Button size="icon" variant="ghost" onClick={handleDismiss}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </>
  )
}
