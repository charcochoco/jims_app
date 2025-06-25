"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { BikeIcon as ChevronRight } from "lucide-react"

export default function Offers() {
  return (
      <section className="py-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold font-title">
                Formule <span className="text-[#d1742c]">Étudiante</span>
              </h2>
              <p className="text-5xl font-bold my-4">7,99€</p>
              <p className="text-gray-600 mb-6 font-secondary">
                Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.
              </p>
              <Link href="https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg">
                <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg px-6 py-3 font-secondary">
                  Commander <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 h-64 md:h-96">
              <Image
                src="/images/studentFormula.png"
                alt="Formule Étudiante Sandwich"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-3xl font-bold font-title">
                Formule <span className="text-[#d1742c]">Midi</span>
              </h2>
              <p className="text-5xl font-bold my-4 font-secondary">9,99€</p>
              <p className="text-gray-600 mb-6 font-secondary">
                Enjoy the large size of sandwiches. Complete perfect slice of sandwiches.
              </p>
              <Link href="https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg">
                <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg px-6 py-3">
                  Commander <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 h-64 md:h-96">
              <Image
                src="/images/lunchFormula.png"
                alt="Formule Midi Sandwich"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
  )
}
