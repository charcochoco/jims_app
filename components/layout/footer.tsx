import { UtensilsCrossed } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center mb-4">
          <UtensilsCrossed className="h-6 w-6 mr-2 text-orange-500" />
          <p className="text-lg font-semibold">Jim&apos;s Snacking</p>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Jim&apos;s Snacking. Tous droits réservés.</p>
        <div className="mt-2 text-sm">
          <Link href="/legal-information" className="hover:text-orange-500 transition-colors">
            Mentions légales
          </Link>
          {" | "}
          <Link href="/privacy-policy" className="hover:text-orange-500 transition-colors">
            Politique de confidentialité
          </Link>
          {" | "}
          <Link href="/terms-of-service" className="hover:text-orange-500 transition-colors">
            Conditions d&apos;utilisation
          </Link>
          {" | "}
          <Link href="/cookies" className="hover:text-orange-500 transition-colors">
            Politique de cookies
          </Link>
        </div>
      </div>
    </footer>
  )
}
