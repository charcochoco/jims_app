"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  UserIcon,
  Award,
  QrCode,
  Edit3,
  ShieldAlert,
  Loader2,
  X,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import StyledQRCode from "@/components/ui/QRcode"
import RegisterPush from "@/components/register-push"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/auth-context"

export default function AccountPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [showQrModal, setShowQrModal] = useState(false)

  const { logout } = useAuth()

  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ firstName: "", lastName: "", password: "", notifications: false })

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch("/api/auth/me", { method: "GET", credentials: "include" })
        if (!res.ok) {
          window.location.href = "/login"
          return
        }
        const data = await res.json()
        setUser(data.user)
        setForm({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          password: "",
          notifications: data.user.notifications,
        })
      } catch {
        setError("Erreur lors du chargement.")
      } finally {
        setIsLoading(false)
      }
    }
    loadUser()
  }, [])

  const handleSave = async () => {
    try {
      const res = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Erreur lors de la mise à jour")
      setEditMode(false)
      window.location.reload()
    } catch (e) {
      setError((e as Error).message)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Confirmer la suppression de votre compte ?")) return
    try {
      await fetch("/api/auth/delete-account", { method: "DELETE", credentials: "include" })
      logout()
      router.push("/register")
    } catch {
      setError("Erreur lors de la suppression du compte")
    }
  }

  if (isLoading) {
    return (
      <main className="bg-[#fdf9f3] min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#d1742c]" />
        <p className="ml-4 text-lg text-[#241f18] font-secondary">Chargement de votre compte...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="bg-[#fdf9f3] min-h-screen py-16 px-6">
        <Card className="max-w-md mx-auto border border-red-400 bg-white rounded-xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center font-secondary">
              <ShieldAlert className="mr-2" /> Erreur de compte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-500">{error}</p>
            <Button onClick={() => router.push("/login")} className="mt-4 bg-[#d1742c] text-white hover:bg-[#b86426] font-secondary">
              Se reconnecter
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-[#241f18] text-center font-title">Mon Compte</h1>

        {/* Section Fidélité */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center text-[#d1742c] font-semibold text-lg font-title">
            <Award className="mr-2" /> Programme de fidélité
          </div>
          <p className="text-2xl font-semibold text-[#241f18] font-secondary">
            Vous avez <span className="text-[#d1742c]">{user.loyaltyPoints || 0}</span> points !
          </p>

          <div className="space-y-2">
            <p className="font-medium flex items-center text-[#241f18] font-secondary">
              <QrCode className="mr-2 text-[#d1742c]" /> Votre QR code :
            </p>
            <div
              className="p-3 bg-white inline-block rounded-lg border border-gray-300 cursor-pointer hover:shadow transition"
              onClick={() => setShowQrModal(true)}
            >
              {user.qrCodeValue ? (
                <StyledQRCode value={user.qrCodeValue} size={64} />
              ) : (
                <p className="text-sm text-gray-400 font-secondary">Aucun QR code disponible.</p>
              )}
            </div>
          </div>

          {showQrModal && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl relative flex flex-col items-center max-w-[90vw]">
                <button
                  onClick={() => setShowQrModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-black"
                >
                  <X className="w-5 h-5" />
                </button>
                <StyledQRCode value={user.qrCodeValue} size={256} withDownload />
                <p className="mt-4 text-sm text-gray-600 font-secondary">Cliquez sur \"Télécharger\" pour enregistrer le QR code.</p>
              </div>
            </div>
          )}

          <Button variant="link" className="text-[#d1742c] px-0" asChild>
            <Link href="/loyalty-rewards font-secondary">Voir les récompenses disponibles (bientôt)</Link>
          </Button>
        </div>

        {/* Section modification compte */}
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center text-[#d1742c] font-semibold text-lg font-title">
            <UserIcon className="mr-2" /> Informations personnelles
          </div>

          {editMode ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="font-secondary" htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                  <Label className="font-secondary" htmlFor="lastName">Nom</Label>
                  <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>
              <div>
                <Label className="font-secondary" htmlFor="password">Mot de passe (laisser vide si inchangé)</Label>
                <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
              </div>
              <label className="flex items-center gap-2 font-secondary">
                <input type="checkbox" checked={form.notifications} onChange={(e) => setForm({ ...form, notifications: e.target.checked })} />
                Recevoir les notifications
              </label>
              <div className="flex gap-3">
                <Button onClick={handleSave} className="bg-[#d1742c] text-white hover:bg-[#b86426] font-secondary">Enregistrer</Button>
                <Button variant="outline" onClick={() => setEditMode(false)} className="font-secondary">Annuler</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="text-[#241f18] space-y-1">
                <p className="font-secondary"><strong>Prénom :</strong> {user.firstName}</p>
                <p className="font-secondary"><strong>Nom :</strong> {user.lastName}</p>
                <p className="font-secondary"><strong>Email :</strong> {user.email}</p>
                <p className="font-secondary"><strong>Rôle :</strong> {user.role === "admin" ? "Administrateur" : "Client"}</p>
                <p className="font-secondary"><strong>Notifications :</strong> {user.notifications ? "Oui" : "Non"}</p>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#d1742c] text-[#d1742c] hover:bg-[#f5eede] font-secondary"
                  onClick={() => setEditMode(true)}
                >
                  <Edit3 className="mr-2 h-4 w-4" /> Modifier
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-2 font-secondary"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" /> Supprimer mon compte
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Notifications push */}
        {user.notifications && <RegisterPush userId={user.id} />}
      </div>
    </main>
  )
}
