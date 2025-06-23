'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

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
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative text-center">
                <button onClick={() => setShowAndroidPrompt(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold mb-2">📲 Installer l'application</h2>
                <p className="text-sm text-gray-700 mb-4">
                Installez cette application sur votre appareil pour y accéder plus rapidement et hors-ligne.
                </p>
                <Button onClick={handleInstall} className="w-full bg-orange-500 hover:bg-orange-600">
                Installer
                </Button>
            </div>
        </div>
      )}

      {showiOSBanner && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full relative text-center">
                <button onClick={() => setShowiOSBanner(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                <X className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold mb-2">📱 Installer l'application</h2>
                <p className="text-sm text-gray-700 mb-4">
                Pour installer cette app sur votre iPhone, appuyez sur le bouton <strong>Partager</strong> (en bas de l’écran depuis Safari), puis sélectionnez <strong>“Sur l’écran d’accueil”</strong>.
                </p>
                <button
                onClick={() => setShowiOSBanner(false)}
                className="mt-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md"
                >
                Fermer
                </button>
            </div>
        </div>
      )}
    </>
  )
}
