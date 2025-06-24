"use client"

import { useEffect, useState } from "react"
import { Facebook, Instagram } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

type JimsInformationType = {
  name: string
  email: string
  phone: string
  address: string
  schedules: string
}

export default function Footer() {
  const [info, setInfo] = useState<JimsInformationType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/jims-information")
        const data = await res.json()
        setInfo(data)
      } catch (err) {
        console.error("Erreur lors de la récupération des infos Jim's", err)
      }
    }

    fetchData()
  }, [])

  return (
    <footer className="bg-[#241f18] text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
        <div>
          <h3 className="font-bold text-white mb-4 text-sm font-title">Jim's</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/menu" className="hover:text-white font-secondary">
                La Carte & Allergènes
              </Link>
            </li>
            <li>
              <Link href="/apropos" className="hover:text-white font-secondary">
                Notre concept
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm font-title">Contact</h3>
          <address className="not-italic space-y-1 text-xs font-secondary">
            <p>{info?.address || "Adresse en chargement..."}</p>
            <p>{info?.phone || "Téléphone en chargement..."}</p>
          </address>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm font-title">Horaires d'ouverture</h3>
          <div className="space-y-1 text-xs font-secondary">
            {info?.schedules
              ? info.schedules.split(/,\s?/).map((line, i) => <p key={i}>{line}</p>)
              : <p>Chargement des horaires…</p>}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm font-title">Légal</h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/terms-of-service" className="hover:text-white font-secondary">
                Conditions générales d'utilisation
              </Link>
            </li>
            <li>
              <Link href="/legal-information" className="hover:text-white font-secondary">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-white font-secondary">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="hover:text-white font-secondary">
                Politique en matière de cookies
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-4 text-sm font-title">Suis-nous</h3>
          <div className="flex space-x-3">
            <a href="https://www.instagram.com/jims.fr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/jims.annecy" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-4 py-6 px-6 border-t border-gray-700 text-center md:flex md:justify-between text-xs text-gray-500">
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-4 md:mb-0">
          <Link href="/sitemap" className="hover:text-white">
            Plan du site
          </Link>
          <span>Pour votre santé, mangez au moins cinq fruits et légumes par jour – www.mangerbouger.fr</span>
        </div>
        <span>Tous droits réservés © Jim's 2025</span>
      </div>
    </footer>
  )
}
