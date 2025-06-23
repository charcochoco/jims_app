// app/reset-password/page.tsx
"use client"

import { useState, Suspense } from "react"
import ResetPasswordForm from "../../components/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<p>Chargement...</p>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
