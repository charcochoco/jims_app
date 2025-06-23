"use client"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
    setSubmitted(true)
  }

  return (
    <div className="max-w-md mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Réinitialiser le mot de passe</h1>
      {submitted ? (
        <p>Un lien de réinitialisation a été envoyé si cet e-mail existe.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="bg-orange-600 text-white p-2 rounded" type="submit">
            Envoyer le lien
          </button>
        </form>
      )}
    </div>
  )
}
