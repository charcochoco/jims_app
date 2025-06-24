"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type JimsInformationType = {
  name: string
  siret: string
  email: string
  phone: string
  address: string
}

export default function MentionsLegales() {
  const [info, setInfo] = useState<JimsInformationType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch("/api/jims-information")
        const data = await res.json()
        setInfo(data)
      } catch (error) {
        console.error("Erreur récupération des données Jim’s :", error)
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
        <p className="font-body text-lg text-red-600">Informations non disponibles.</p>
      </main>
    )
  }

  return (
    <main className="bg-[#f5eede] text-[#241f18] px-6 md:px-12 lg:px-24 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-title font-bold">Mentions Légales</h1>

        <section className="space-y-4 font-body">
          <h2 className="text-2xl font-bold">Éditeur du site</h2>
          <p>Nom de l’entreprise : <strong>{info.name}</strong></p>
          <p>Adresse : {info.address}</p>
          <p>Téléphone : {info.phone}</p>
          <p>Email : {info.email}</p>
          <p>SIRET : {info.siret}</p>
        </section>

        <section className="space-y-4 font-body">
          <h2 className="text-2xl font-bold">Responsable de la publication</h2>
          <p>Ruben Cardoso, en sa qualité de gérant de la société {info.name}.</p>
        </section>

        <section className="space-y-4 font-body">
          <h2 className="text-2xl font-bold">Hébergement</h2>
          <p>Le site est hébergé par : <strong>Hostinger International Ltd.</strong></p>
          <p>Adresse : 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
          <p>Serveur situé en : France – Paris</p>
          <p>Site web de l’hébergeur : <a href="https://www.hostinger.fr" className="text-[#d1742c] underline">www.hostinger.fr</a></p>
        </section>


        <section className="space-y-4 font-body">
          <h2 className="text-2xl font-bold">Données personnelles</h2>
          <p>
            Les données collectées via ce site (formulaire de contact, inscription, fidélité) sont traitées dans le respect du Règlement Général sur la Protection des Données (RGPD).
            Pour plus d'informations, consultez notre <Link href="/privacy-policy" className="text-[#d1742c] underline">politique de confidentialité</Link>.
          </p>
        </section>

        <section className="space-y-4 font-body">
          <h2 className="text-2xl font-bold">Propriété intellectuelle</h2>
          <p>
            Le contenu de ce site (textes, images, illustrations, logo) est la propriété exclusive de {info.name}, sauf mention contraire.
            Toute reproduction, totale ou partielle, est interdite sans autorisation préalable.
          </p>
        </section>

        <div className="pt-8 text-sm font-secondary italic">
          <p>Dernière mise à jour : 24 juin 2025</p>
        </div>
      </div>
    </main>
  )
}
