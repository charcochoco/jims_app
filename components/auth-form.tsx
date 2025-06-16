"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "../hooks/use-toast"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/hooks/auth-context"

interface AuthFormProps {
  mode: "login" | "register"
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("") // For registration
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register"
    const payload = mode === "login" ? { email, password } : { name, email, password }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || (mode === "login" ? "Échec de la connexion." : "Échec de l'inscription."))
      }

      login(data.user, data.token)

      toast({
        title: mode === "login" ? "Connexion réussie!" : "Inscription réussie!",
        description:
          mode === "login" ? "Vous êtes maintenant connecté." : "Bienvenue ! Vous pouvez maintenant vous connecter.",
      })

      // Redirect after successful login/registration
      if (mode === "login") {
        if (data.user.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/account")
        }
      } else {
        router.push("/")
      }
      router.refresh() // To update navbar state
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur inconnue est survenue."
      setError(errorMessage)
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Se connecter" : "Créer un compte"}</CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Accédez à votre compte Jim's."
            : "Rejoignez Jim's pour profiter de nos offres et de notre programme de fidélité."}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {mode === "register" && (
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
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
              minLength={mode === "register" ? 6 : undefined}
              disabled={isLoading}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "login" ? "Se connecter" : "S'inscrire"}
          </Button>
          {mode === "login" ? (
            <p className="text-sm text-muted-foreground">
              Pas encore de compte ?{" "}
              <Link href="/register" className="font-medium text-orange-600 hover:underline">
                S&apos;inscrire
              </Link>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Déjà un compte ?{" "}
              <Link href="/login" className="font-medium text-orange-600 hover:underline">
                Se connecter
              </Link>
            </p>
          )}
        </CardFooter>
      </form>
    </Card>
  )
}
