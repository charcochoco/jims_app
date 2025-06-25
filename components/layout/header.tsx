"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/auth-context"
import Image from "next/image"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isLoggedIn, isAdmin, logout } = useAuth()

  const navLinks = [
    { href: "/menu", label: "La carte" },
    { href: "/apropos", label: "A propos" },
    // { href: "/contact", label: "Contact" },
    ...(isLoggedIn ? [{ href: "/account", label: "Mon compte" }] : []),
    ...(isLoggedIn && isAdmin ? [{ href: "/admin/home", label: "Admin" }] : []),
  ]

  return (
    <header className="font-body py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center sticky top-0 z-50 bg-[#f5eede]/80 backdrop-blur-sm">
      <div className="text-2xl font-bold font-title">
        <Link href="/">
          <Image
            src="/images/Logo.png"
            alt="Bowl of noodles"
            width={60}
            height={135}
            className="rounded-lg object-cover z-0"
            style={{maxHeight: '135px', maxWidth: '60px'}}
          />
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-6">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-[#d1742c] font-secondary">
            {link.label}
          </Link>
        ))}
        <Link href="https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg" className="text-[#d1742c] hover:text-[#b86426] font-secondary">
          Commander
        </Link>
        {isLoggedIn ? (
          <Button
            onClick={logout}
            variant="ghost"
            className="text-[#d1742c] hover:text-[#b86426] flex items-center font-secondary"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Déconnexion
          </Button>
        ) : (
          <Link href="/login">
            <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg font-secondary">Se connecter</Button>
          </Link>
        )}
      </nav>

      <div className="md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white text-[#241f18]" side="right">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start text-lg w-full font-secondary">
                    {link.label}
                  </Button>
                </Link>
              ))}
              <Link href="https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg" className="text-[#d1742c] hover:text-[#b86426] font-secondary">
                Commander
              </Link>
              {isLoggedIn ? (
                <Button
                  className="justify-start text-lg font-secondary"
                  variant="ghost"
                  onClick={() => {
                    logout()
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Déconnexion
                </Button>
              ) : (
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="font-secondary bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg w-full justify-start text-lg">
                    Se connecter
                  </Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

