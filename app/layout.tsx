import type React from "react"
import type { Metadata } from "next";
//import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google"
import "./globals.css";
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/auth-context"
import InstallPrompt from "@/components/ui/installPrompt"

const inter = Inter({ subsets: ["latin"] })

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
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">{children} <InstallPrompt /></main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}