"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type JimsInformationType = {
  name: string
  email: string
  address: string
}

export default function PolitiqueConfidentialite() {
  const [info, setInfo] = useState<JimsInformationType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("/api/jims-information")
        const data = await res.json()
        setInfo(data)
      } catch (error) {
        console.error("Erreur récupération des infos Jim’s :", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInfo()
  }, [])

  if (loading) {
    return (
      <main className="bg-[#f5eede] text-[#241f18] px-6 md:px-12 lg:px-24 py-16">
        <p className="font-body text-lg">Chargement des informations...</p>
      </main>
    )
  }

  if (!info) {
    return (
      <main className="bg-[#f5eede] text-[#241f18] px-6 md:px-12 lg:px-24 py-16">
        <p className="font-body text-lg text-red-600">Impossible de charger les informations de l’entreprise.</p>
      </main>
    )
  }

  return (
    <main className="bg-[#f5eede] text-[#241f18] px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-title font-bold">Politique de confidentialité</h1>

        <section className="space-y-4 font-body">
          <p>
            Chez <strong>{info.name}</strong>, nous accordons une importance particulière à la protection de vos données personnelles.
            Cette politique décrit quelles données nous collectons, pourquoi, et comment nous les traitons en toute sécurité.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">1. Responsable du traitement</h2>
          <p>Ruben Cardoso – Gérant de la société {info.name}</p>
          <p>Email : {info.email}</p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">2. Données collectées</h2>
          <ul className="list-disc list-inside">
            <li>Données d’identification : nom, prénom, email</li>
            <li>Données de fidélité : points, historique d’achats</li>
          </ul>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">3. Finalités du traitement</h2>
          <ul className="list-disc list-inside">
            <li>Gérer vos commandes et la livraison</li>
            <li>Assurer la gestion de votre fidélité</li>
            <li>Améliorer votre expérience utilisateur</li>
          </ul>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">4. Conservation des données</h2>
          <p>
            Vos données sont supprimées sur demande.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">5. Partage des données</h2>
          <p>
            Nous ne partageons jamais vos données à des fins commerciales.
            Elles sont traitées uniquement par des prestataires techniques strictement nécessaires à notre activité.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">6. Sécurité</h2>
          <p>
            Vos données sont stockées sur un serveur sécurisé en France (Paris), hébergé par Hostinger.
            Le transfert des données se fait uniquement via des connexions chiffrées (HTTPS).
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">7. Vos droits</h2>
          <ul className="list-disc list-inside">
            <li>Accès, modification ou suppression de vos données personnelles</li>
            <li>Contact : <a href={`mailto:${info.email}`} className="text-[#d1742c] underline">{info.email}</a></li>
          </ul>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold mt-6">8. Cookies</h2>
          <p>
            Notre site utilise des cookies pour le bon fonctionnement.
            Voir notre <Link href="/cookies" className="text-[#d1742c] underline">politique de cookies</Link>.
          </p>
        </section>

        <div className="pt-8 text-sm font-secondary italic">
          <p>Dernière mise à jour : 24 juin 2025</p>
        </div>
      </div>
    </main>
  )
}
