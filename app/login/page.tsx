"use client"

import AuthForm from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <h1 className="text-3xl font-bold mb-8 text-orange-600">Connexion</h1>
      <AuthForm mode="login" />
    </div>
  )
}
