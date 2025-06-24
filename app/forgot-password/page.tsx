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
    <main className="bg-[#fdf9f3] py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-[#241f18] mb-6 text-center font-title">Mot de passe oublié</h1>
        <p className="text-gray-600 text-center mb-8 font-secondary">
          Saisis ton adresse e-mail pour recevoir un lien de réinitialisation.
        </p>
        {submitted ? (
          <p className="text-center text-green-600 font-secondary">Un lien de réinitialisation a été envoyé si cet e-mail existe.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#241f18] mb-1 font-secondary">
                Adresse e-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1742c]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#d1742c] hover:bg-[#b86426] text-white font-semibold py-2 rounded-md font-secondary"
            >
              Envoyer le lien
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
