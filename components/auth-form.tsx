"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/auth-context"

interface AuthFormProps {
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptFidelity, setAcceptFidelity] = useState(false)
  const [acceptNotifications, setAcceptNotifications] = useState(false)
  const [confirmAge, setConfirmAge] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register"
    const payload =
      mode === "login"
        ? { email, password }
        : { firstName, lastName, email, password, acceptNotifications }

    if (mode === "register") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
      if (!passwordRegex.test(password)) {
        setError("Mot de passe trop faible.")
        toast({
          title: "Erreur",
          description: "Le mot de passe doit contenir au moins 8 caractères, avec majuscule, minuscule, chiffre et symbole.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
      if (password !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas.")
        toast({
          title: "Erreur",
          description: "Les mots de passe ne correspondent pas.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Une erreur est survenue.")

      if (mode === "login") login(data.user, data.token)

      toast({
        title: mode === "login" ? "Connexion réussie" : "Inscription réussie",
        description:
          mode === "login"
            ? "Bienvenue sur Jim's !"
            : "Vérifie ton email pour activer ton compte.",
      })

      router.push(mode === "login" ? (data.user.role === "admin" ? "/admin/home" : "/account") : "/login")
      router.refresh()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue."
      setError(message)
      toast({ title: "Erreur", description: message, variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === "register" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name">Prénom</Label>
            <Input
              id="first_name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="last_name">Nom</Label>
            <Input
              id="last_name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {mode === "register" && (
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmation</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>
      )}

      {mode === "register" && (
        <div className="space-y-3 text-sm text-gray-600">
          <label className="flex items-start gap-2">
            <input type="checkbox" required checked={acceptTerms} onChange={() => setAcceptTerms(!acceptTerms)} />
            <span className="font-secondary">
              J'accepte les{" "}
              <Link href="/terms-of-service" className="text-[#d1742c] underline font-secondary">
                Conditions d’utilisation
              </Link>
              ,{" "}
              <Link href="/privacy-policy" className="text-[#d1742c] underline font-secondary">
                Politique de confidentialité
              </Link>{" "}
              et{" "}
              <Link href="/legal-information" className="text-[#d1742c] underline font-secondary">
                Mentions légales
              </Link>.
            </span>
          </label>

          <label className="flex items-start gap-2">
            <input type="checkbox" required checked={acceptFidelity} onChange={() => setAcceptFidelity(!acceptFidelity)} />
            <span className="font-secondary">Je souhaite adhérer au programme fidélité Jim's.</span>
          </label>

          <label className="flex items-start gap-2">
            <input type="checkbox" checked={acceptNotifications} onChange={() => setAcceptNotifications(!acceptNotifications)} />
            <span className="font-secondary">Je souhaite recevoir des notifications push.</span>
          </label>

          <label className="flex items-start gap-2">
            <input type="checkbox" required checked={confirmAge} onChange={() => setConfirmAge(!confirmAge)} />
            <span className="font-secondary">Je confirme avoir 16 ans ou plus.</span>
          </label>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button type="submit" className="w-full bg-[#d1742c] hover:bg-[#b86426]" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin font-secondary" />}
        {mode === "login" ? "Se connecter" : "S'inscrire"}
      </Button>

      {mode === "login" ? (
        <div className="text-sm text-center">
          <p>
            <Link href="/forgot-password" className="text-[#d1742c] underline font-secondary">
              Mot de passe oublié ?
            </Link>
          </p>
          <p className="mt-2 font-secondary">
            Pas encore de compte ?{" "}
            <Link href="/register" className="text-[#d1742c] underline font-secondary">
              S’inscrire
            </Link>
          </p>
        </div>
      ) : (
        <p className="text-sm text-center font-secondary">
          Déjà inscrit ?{" "}
          <Link href="/login" className="text-[#d1742c] underline font-secondary">
            Se connecter
          </Link>
        </p>
      )}
    </form>
  )
}
