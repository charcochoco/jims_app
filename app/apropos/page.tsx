"use client"

import { useEffect, useState } from "react"
import InfoSection from "@/components/infoSection"
import CtaOrder from "@/components/ctaOrder"
import {
  Loader2,
} from "lucide-react"

export default function NotreConceptPage() {
  const [sections, setSections] = useState<
    { id: number; title: string; description: string }[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadInfo = async () => {
      try {
        fetch("/api/about")
          .then((res) => res.json())
          .then((data) => setSections(data))
      } finally {
        setIsLoading(false)
      }
    }
    loadInfo()
  }, [])


  if (isLoading) {
    return (
      <main className="bg-[#fdf9f3] min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#d1742c]" />
        <p className="ml-4 text-lg text-[#241f18] font-secondary">Chargement des informations...</p>
      </main>
    )
  }

  return (
    <>
      <main className="px-4 sm:px-6 md:px-12 lg:px-24">
        {sections.map((section, i) => {
          const [before, after] = section.title.split(" ")
          return (
            <InfoSection
              key={section.id}
              title={section.title}
              highlightedWord={after}
              imageUrl={
                i === 0
                  ? "/images/mascotte.svg"
                  : i === 1
                    ? "/images/studentFormula.svg"
                    : "/images/jims.png"
              }
              imageAlt="Illustration section"
              imagePosition={i % 2 === 1 ? "left" : "right"}
            >
              <p>{section.description}</p>
            </InfoSection>
          )
        })}
      </main>
      <CtaOrder />
    </>
  )
}
