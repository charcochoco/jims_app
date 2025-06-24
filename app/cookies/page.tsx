"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type JimsInformationType = {
  name: string
  email: string
}

export default function CookiesPage() {
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
        <p className="font-body text-lg">Chargement des informations…</p>
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
        <h1 className="text-4xl font-title font-bold">Politique de cookies</h1>

        <section className="space-y-4 font-body">
          <p>
            Cette page explique comment <strong>{info.name}</strong> utilise les cookies sur son site web.
            En naviguant sur notre site, vous acceptez l'utilisation de cookies selon cette politique.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">1. Qu'est-ce qu’un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur votre appareil lorsque vous visitez un site.
            Il permet de reconnaître votre appareil et d’améliorer votre expérience utilisateur.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">2. Types de cookies utilisés</h2>
          <ul className="list-disc list-inside">
            <li><strong>Cookies fonctionnels :</strong> nécessaires au bon fonctionnement du site (ex : authentification, navigation).</li>
            <li><strong>Cookies tiers :</strong> utilisés par des services externes (ex : intégration Instagram).</li>
          </ul>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">4. Vos droits</h2>
          <p>
            Vous disposez d’un droit d’accès, de rectification et de suppression de vos données.
            Pour toute question relative aux cookies ou à vos données personnelles, contactez-nous à :{" "}
            <a href={`mailto:${info.email}`} className="text-[#d1742c] underline">{info.email}</a>
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">5. Mise à jour</h2>
          <p>
            Cette politique peut être modifiée à tout moment pour se conformer à la réglementation en vigueur ou améliorer la transparence.
          </p>
        </section>

        <div className="pt-8 text-sm font-secondary italic">
          <p>Dernière mise à jour : 24 juin 2025</p>
        </div>
      </div>
    </main>
  )
}
