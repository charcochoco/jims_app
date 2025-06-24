import type React from "react"
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/auth-context"
import InstallPrompt from "@/components/ui/installPrompt"


export const metadata: Metadata = {
  title: "Jim's Snacking - Le meilleur du snack !",
  description: "Découvrez les délicieux snacks de Jim's. Commande en ligne et programme de fidélité.",
  manifest: "/manifest.ts",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <div className="min-h-screen bg-[#f5eede] text-[#241f18]">
            <Header />
            <main className="flex-grow container mx-auto">{children} <InstallPrompt /></main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}