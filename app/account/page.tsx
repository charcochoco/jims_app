"use client"

import Link from "next/link"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserIcon, Award, QrCode, Edit3, ShieldAlert, Loader2, X } from "lucide-react"
import StyledQRCode from "@/components/ui/QRcode"
import RegisterPush from "../../components/register-push"

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const [user, setUser] = useState<any>(null)
  const [showQrModal, setShowQrModal] = useState(false)

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: "GET",
          credentials: "include"
        })

        if (!res.ok) {
          window.location.href = "/login"
          return
        }

        const data = await res.json()
        
        setUser(data.user)
      } catch {
        setError("Erreur lors du chargement.")
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />{" "}
        <p className="ml-4 text-lg">Chargement de votre compte...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-10 border-red-500">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center">
            <ShieldAlert className="mr-2" /> Erreur de compte
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
          <Button onClick={() => router.push("/login")} className="mt-4 bg-orange-500 hover:bg-orange-600">
            Se reconnecter
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!user) {
    return <div className="text-center py-10">Utilisateur non trouvé.</div> // Should be handled by redirect
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-orange-600">Mon Compte</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserIcon className="mr-2 h-6 w-6 text-orange-500" /> Informations Personnelles
          </CardTitle>
          <CardDescription>Gérez vos informations personnelles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>
            <strong>Nom:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Rôle:</strong> {user.role === "admin" ? "Administrateur" : "Client"}
          </p>
          <Button variant="outline" size="sm" className="mt-2 border-orange-500 text-orange-500 hover:bg-orange-50">
            <Edit3 className="mr-2 h-4 w-4" /> Modifier (Bientôt disponible)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="mr-2 h-6 w-6 text-orange-500" /> Programme de Fidélité
          </CardTitle>
          <CardDescription>Consultez vos points et votre QR code de fidélité.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-2xl font-semibold">
            Vous avez <span className="text-orange-500">{user.loyaltyPoints || 0}</span> points de fidélité !
          </p>
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <QrCode className="mr-2 h-5 w-5 text-orange-500" /> Votre QR Code de Fidélité:
            </h3>

            <div
              className="p-4 bg-white inline-block rounded-md border cursor-pointer hover:shadow-lg transition"
              onClick={() => setShowQrModal(true)}
            >
              {user.qrCodeValue ? (
                <StyledQRCode value={user.qrCodeValue} />
              ) : (
                <p className="text-sm text-muted-foreground">Aucun QR code disponible.</p>
              )}
            </div>

            {showQrModal && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl relative flex flex-col items-center max-w-[90vw]">
                  <button onClick={() => setShowQrModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-black">
                    <X className="w-5 h-5" />
                  </button>
                  <StyledQRCode value={user.qrCodeValue} size={256} withDownload />
                  <p className="mt-4 text-sm text-gray-600">Cliquez sur "Télécharger" pour enregistrer le QR code</p>
                </div>
              </div>
              )}
          </div>
          <Button variant="link" className="text-orange-500 p-0 h-auto" asChild>
            <Link href="/loyalty-rewards">Voir les récompenses disponibles (Bientôt)</Link>
          </Button>
        </CardContent>
      </Card>
      {user && user.notifications && <RegisterPush userId={user.id} />}
    </div>
  )
}
