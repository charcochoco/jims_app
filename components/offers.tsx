"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface Formula {
  id: number
  name: string
  price: string
  description: string
}

export default function Offers() {
  const [formulas, setFormulas] = useState<Formula[]>([])

  useEffect(() => {
    const fetchFormulas = async () => {
      const res = await fetch("/api/formulas")
      const data = await res.json()
      setFormulas(data)
    }
    fetchFormulas()
  }, [])

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24" style={{backgroundColor: 'black'}}>
      <div className="max-w-7xl mx-auto space-y-12">
        {formulas.map((f, i) => (
          <div
            key={f.id}
            className={`flex flex-col md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""} items-center rounded-xl overflow-hidden`}
            style={{
              backgroundColor: "#F5EEDE",
              boxShadow: "0 0 12px rgba(0, 0, 0, 0.15)"
            }}
          >
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold font-title">
                Formule <span className="text-[#d1742c]">{f.name}</span>
              </h2>
              <p className="text-5xl font-bold my-4 font-secondary">{f.price}</p>
              <p className="text-gray-600 mb-6 font-secondary">{f.description}</p>
              <Link href="https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg">
                <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg px-6 py-3 font-secondary">
                  Je commande <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 h-64 md:h-96">
              <Image
                src={
                  i === 0
                    ? "/images/studentFormula.svg"
                    : "/images/lunchFormula.svg"
                }
                alt={`Formule ${f.name}`}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
