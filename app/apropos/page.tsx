"use client"

import Image from "next/image"
import CtaOrder from "@/components/CtaOrder"
import type React from "react"

interface InfoSectionProps {
  title: string
  highlightedWord: string
  children: React.ReactNode
  imageUrl: string
  imageAlt: string
  imagePosition?: "left" | "right"
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  highlightedWord,
  children,
  imageUrl,
  imageAlt,
  imagePosition = "right",
}) => {
  const titleParts = title.split(highlightedWord)

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-24 py-12 md:py-16 max-w-7xl mx-auto">
      <div
        className={`flex flex-col md:flex-row justify-between items-center gap-12 ${
          imagePosition === "left" ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full md:w-6/12 flex-1">
          <h2 className="text-3xl md:text-5xl font-title font-bold text-brand-text mb-4">
            {titleParts[0]}
            <span className="text-[#d1742c]">{highlightedWord}</span>
            {titleParts[1]}
          </h2>
          <div className="space-y-4 text-brand-text-secondary font-body text-base md:text-lg">
            {children}
          </div>
        </div>

        <div className="w-full md:w-5/12 flex-1">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt}
            width={500}
            height={350}
            className="rounded-lg shadow-lg object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  )
}

export default function NotreConceptPage() {
  return (
    <>
      <main className="px-4 sm:px-6 md:px-12 lg:px-24">
        <InfoSection
          title="Notre histoire"
          highlightedWord="histoire"
          imageUrl="/images/lunchFormula.png"
          imageAlt="Burger and fries on a plate"
        >
          <p>
            Jim&apos;s est né d&apos;une ambition et d&apos;une motivation sans faille. Ruben, notre jeune fondateur, a
            commencé comme livreur de pizzas avant de devenir gérant à l&apos;âge de 19 ans. En 2023, il a ouvert son
            premier concept de restaurant nocturne, qui a connu un succès retentissant. La mission est claire : servir
            des plats frais et de qualité dans une ambiance chaleureuse et accueillante. Le nom Jim&apos;s est un clin
            d&apos;œil à ses racines familiales. Au cœur de tout cela ? L&apos;amour de l&apos;entrepreneuriat, de la
            bonne cuisine et la création d&apos;un lieu où les gens se sentent chez eux.
          </p>
        </InfoSection>

        <InfoSection
          title="Ce que nous servons"
          highlightedWord="servons"
          imageUrl="/images/classique.jpg"
          imageAlt="Burger and fries view"
          imagePosition="left"
        >
          <p>
            Nous nous concentrons sur trois choses : les hamburgers, les sandwichs et les salades, tous préparés chaque
            jour à partir de produits frais. Pas de raccourcis, pas de compromis. Nos recettes sont simples mais
            généreuses, inspirées de ce que nous aimons manger nous-mêmes. Que vous souhaitiez manger un morceau sur le
            pouce entre deux cours ou terminer une soirée entre amis, Jim&apos;s est là pour vous satisfaire. Nos prix
            sont raisonnables, nos portions sont généreuses et notre livraison est rapide. L&apos;ambiance ?
            Décontractée, conviviale et un peu audacieuse, à l&apos;image de notre cuisine.
          </p>
        </InfoSection>

        <InfoSection
          title="C'est important"
          highlightedWord="important"
          imageUrl="/images/studentFormula.png"
          imageAlt="Side view of a burger and fries"
        >
          <p>
            Chez Jim&apos;s, on sert de bons burgers, jusque tard le soir, sans chichis. Nous ciblons les étudiants, les
            jeunes professionnels et les gens du coin qui veulent bien manger sans perdre de temps. Le service est
            rapide, l&apos;ambiance est cool et les plats sont frais. Un bon repas à un prix raisonnable, que ce soit à
            midi ou à minuit. Nous connaissons nos clients, nous passons de la bonne musique et nous restons fidèles à
            nous-mêmes. Manger chez Jim&apos;s, c&apos;est tout simplement ça : bien manger, se sentir à l&apos;aise et
            savoir qu&apos;on peut revenir quand on veut.
          </p>
        </InfoSection>
      </main>
      <CtaOrder />
    </>
  )
}
