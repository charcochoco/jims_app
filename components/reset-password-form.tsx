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
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

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

  return success ? (
    <p className="text-green-600 text-center">Mot de passe réinitialisé ! Redirection...</p>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#241f18] mb-1">
          Nouveau mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1742c]"
        />
      </div>
      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-[#241f18] mb-1">
          Confirmation
        </label>
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1742c]"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full bg-[#d1742c] hover:bg-[#b86426] text-white font-semibold py-2 rounded-md"
      >
        Réinitialiser le mot de passe
      </button>
    </form>
  )
}
