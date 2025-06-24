"use client"

import { Suspense } from "react"
import ResetPasswordForm from "@/components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <main className="bg-[#fdf9f3] py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-[#241f18] mb-6 text-center font-title">Nouveau mot de passe</h1>
        <p className="text-gray-600 text-center mb-8 font-secondary">
          Choisis un nouveau mot de passe pour accéder à ton compte Jim’s.
        </p>
        <Suspense fallback={<p className="text-center text-gray-600 font-secondary">Chargement...</p>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  )
}
