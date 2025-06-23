// app/reset-password/reset-password-form.tsx
"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password !== confirm) return setError("Les mots de passe ne correspondent pas")

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    })

    if (res.ok) {
      setSuccess(true)
      setTimeout(() => router.push("/login"), 3000)
    } else {
      const { message } = await res.json()
      setError(message || "Erreur lors de la réinitialisation.")
    }
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Nouveau mot de passe</h1>
      {success ? (
        <p className="text-green-600">Mot de passe réinitialisé ! Redirection...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2"
          />
          <input
            type="password"
            placeholder="Confirmer"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full border p-2"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="bg-orange-600 text-white p-2 rounded" type="submit">
            Réinitialiser
          </button>
        </form>
      )}
    </div>
  )
}
