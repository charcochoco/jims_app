"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export default function CtaOrder() {
  return (
      <section className="relative bg-gradient-to-r from-yellow-400 via-[#d1742c] to-orange-500 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-2/5 lg:w-1/3 relative h-64 md:h-auto self-stretch">
            <Image
              src="/images/footer.png"
              alt="Salad bowl"
              layout="fill"
              objectFit="cover"
              className="md:rounded-r-none"
            />
          </div>
          <div className="md:w-3/5 lg:w-2/3 py-12 px-6 md:py-20 md:px-12 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-title">
              Envie de te régaler dès maintenant ?
            </h2>
            <Link href="https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg" target="_blank">
              <Button
                size="lg"
                className="font-secondary bg-[#d1742c] text-white hover:bg-[#b86426] font-bold text-lg px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                Je commande <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
  )
}
