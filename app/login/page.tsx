"use client"

import AuthForm from "@/components/auth-form"

export default function LoginPage() {
  return (
    <main className="bg-[#fdf9f3] py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-[#241f18] mb-6 text-center font-title">Connexion</h1>
        <p className="text-gray-600 text-center mb-10 font-secondary">Connecte-toi pour accéder à ton compte Jim’s.</p>
        <AuthForm mode="login" />
      </div>
    </main>
  )
}
