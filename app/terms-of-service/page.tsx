"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type JimsInformationType = {
  name: string
  email: string
  address: string
}

export default function ConditionsUtilisation() {
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
        <p className="font-body text-lg">Chargement des conditions...</p>
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
        <h1 className="text-4xl font-title font-bold">Conditions Générales d'Utilisation</h1>

        <section className="space-y-4 font-body">
          <p>
            Les présentes Conditions Générales d’Utilisation (CGU) régissent l’accès et l’utilisation du site <strong>{info.name}</strong>.
            En naviguant sur ce site, vous acceptez sans réserve ces conditions.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">1. Présentation du site</h2>
          <p>
            Le site <strong>{info.name}</strong> permet aux utilisateurs de consulter le menu, commander en ligne via Uber Eats,
            et cumuler des points de fidélité pour bénéficier de récompenses exclusives.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">2. Accès au site</h2>
          <p>
            Le site est accessible 7j/7, 24h/24 sauf en cas de force majeure ou d’interruption pour maintenance technique.
            <strong>Jim’s</strong> ne saurait être tenu responsable de toute interruption ou dysfonctionnement.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">3. Responsabilité</h2>
          <p>
            L’utilisateur s’engage à utiliser le site de manière responsable. {info.name} ne saurait être tenu responsable d’une mauvaise utilisation,
            ou de dommages directs ou indirects liés à l’usage du site.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">4. Propriété intellectuelle</h2>
          <p>
            Tous les éléments du site (textes, images, logo, interface) sont la propriété exclusive de {info.name}, sauf mention contraire.
            Toute reproduction, totale ou partielle, est strictement interdite sans autorisation écrite.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">5. Données personnelles</h2>
          <p>
            Les données collectées via ce site sont traitées conformément au RGPD. Pour plus d'informations, consultez notre{" "}
            <Link href="/privacy-policy" className="text-[#d1742c] underline">politique de confidentialité</Link>.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">6. Cookies</h2>
          <p>
            Le site utilise des cookies pour garantir son bon fonctionnement.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">7. Modification des CGU</h2>
          <p>
            {info.name} se réserve le droit de modifier les présentes CGU à tout moment.
            Les utilisateurs seront informés en cas de mise à jour importante.
          </p>
        </section>

        <section className="space-y-2 font-body">
          <h2 className="text-2xl font-bold">8. Contact</h2>
          <p>
            Pour toute question relative aux CGU, vous pouvez nous contacter à l’adresse :{" "}
            <a href={`mailto:${info.email}`} className="text-[#d1742c] underline">{info.email}</a>
          </p>
        </section>

        <div className="pt-8 text-sm font-secondary italic">
          <p>Dernière mise à jour : 24 juin 2025</p>
        </div>
      </div>
    </main>
  )
}
