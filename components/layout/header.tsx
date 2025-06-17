"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon, UtensilsCrossed, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/auth-context"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isLoggedIn, isAdmin, logout } = useAuth()
  // console.log("isLoggedIn : ",isLoggedIn)
  // console.log("isAdmin : ",isAdmin)
  const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/menu", label: "Menu" },
    { href: "/apropos", label: "A propos" },
    { href: "/contact", label: "Contact" },
    ...(isLoggedIn ? [{ href: "/account", label: "Mon Compte" }] : [{ href: "/login", label: "Connexion" }]),
    ...(isLoggedIn && isAdmin ? [{ href: "/admin/home", label: "Admin" }] : []),
  ]

  return (
    <header className="bg-background border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-orange-500">
          <UtensilsCrossed className="h-7 w-7" />
          Jim&apos;s
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          {isLoggedIn && (
            <Button variant="ghost" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" /> Déconnexion
            </Button>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    variant="ghost"
                    className="justify-start text-lg"
                    asChild
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </Button>
                ))}
                {isLoggedIn && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      logout()
                      setIsMobileMenuOpen(false)
                    }}
                    className="justify-start text-lg"
                  >
                    <LogOut className="mr-2 h-5 w-5" /> Déconnexion
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
