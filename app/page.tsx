"use client"

import PostInsta from "../components/postInsta"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BikeIcon as Motorcycle, ShoppingBag, MapPin, Search, ChevronRight } from "lucide-react"
import Offers from "@/components/offers"
import CtaOrder from "@/components/CtaOrder"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Home() {
  const [adresse, setAdresse] = useState("")

  const handleCommander = () => {
    if (!adresse.trim()) return

    const plObject = {
      address: adresse,
      referenceType: "user_input"
    }

    const encodedPl = btoa(encodeURIComponent(JSON.stringify(plObject)))

    const url = `https://www.ubereats.com/fr/store/jims-annecy/NOyCup-kXk2BYH-I99MPHg?pl=${encodedPl}`

    window.open(url, "_blank")
  }

  const posts = [
    "https://www.instagram.com/p/DLFX9UaIE8k/?img_index=1",
    "https://www.instagram.com/p/DLA8axNIbwa/",
    "https://www.instagram.com/p/DKJ35ASoid_/"
  ]

  const smallImages = [
    { src: "/images/burrata.jpg", alt: "Salade burrata" },
    { src: "/images/fry.png", alt: "Frites" },
    { src: "/images/rustikBeef.jpg", alt: "Burger rustik beef" },
  ]

  const largeImages = [
    { src: "/images/classique.jpg", alt: "Burger classique" },
    { src: "/images/cesar.jpg", alt: "Salade césar" },
  ]


  return (
    <main>
      <section className="bg-[#d1742c] text-white pt-10 pb-10 md:pb-20 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight font-title">Bienvenue chez Jim's Burger</h1>
            <div className="bg-white p-6 rounded-xl shadow-lg text-[#241f18]">
              <div className="flex mb-4">
                <Button
                  variant="ghost"
                  className="flex-1 bg-[#f5eede] hover:bg-[#e0d5c0] text-[#d1742c] rounded-lg mr-2 font-secondary"
                >
                  <Motorcycle className="w-5 h-5 mr-2" />
                  Livraison
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Entre ton adresse"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 focus:border-[#d1742c] focus:ring-[#d1742c]"
                  />
                </div>
                <Button
                  onClick={handleCommander}
                  className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg whitespace-nowrap font-secondary"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Commander
                </Button>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0 ps-8 flex justify-center md:justify-end">
            <Image
              src="/images/mascotte.png"
              alt="Mascotte Jim's burger"
              width={250}
              height={250}
              className="rounded-lg object-cover z-0"
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-12 lg:px-24">
        {/* Petites images (3 colonnes) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          {smallImages.map((img, index) => (
            <div
              key={index}
              className="relative h-64 bg-[#241f18] rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>

        {/* Grandes images (2 colonnes) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {largeImages.map((img, index) => (
            <div
              key={index}
              className="relative h-96 bg-[#241f18] rounded-xl shadow-md overflow-hidden"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>



      <Offers />

      <section className="py-16 px-6 md:px-12 lg:px-24 text-center bg-[#fdf9f3]">
        <h2 className="text-4xl font-bold mb-10 text-[#241f18] font-title">Rejoins-nous sur Insta</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-10">
          {posts.slice(0, 3).map((url, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <PostInsta url={url} />
            </div>
          ))}
        </div>

        <Link href="https://www.instagram.com/jims.fr/" target="_blank">
          <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg px-8 py-3 text-lg font-secondary">
            Suis-nous sur Insta
          </Button>
        </Link>
      </section>

      <section className="py-16 md:py-24 bg-[#241f18] text-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="flex items-start space-x-6">
            {/* <Avatar className="w-20 h-20 border-2 border-gray-700 flex-shrink-0">
                <AvatarImage src="/thoughtful-man-portrait.png" alt="Timothy Nathan" />
                <AvatarFallback>TN</AvatarFallback>
              </Avatar> */}
            <div>
              <blockquote className="text-lg text-gray-300 font-body">
                "Extremely easy to use, helped us develop our Vote for George Washington micro-site extre- mely
                quickly! We will definitely use it again for other projects"
              </blockquote>
              <p className="mt-4 font-semibold tracking-wider uppercase text-sm text-gray-500 font-secondary">Timothy Nathan</p>
            </div>
          </div>
          <div className="flex items-start space-x-6">
            {/* <Avatar className="w-20 h-20 border-2 border-gray-700 flex-shrink-0">
                <AvatarImage src="/placeholder-yixjb.png" alt="Austin Campbell" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar> */}
            <div>
              <blockquote className="text-lg text-gray-300 font-body">
                "As a business targeting high net worth individuals, we were looking for a slick, cool and
                mini-malistic design for our website"
              </blockquote>
              <p className="mt-4 font-semibold tracking-wider uppercase text-sm text-gray-500 font-secondary">Austin Campbell</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f5eede] text-[#241f18]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center font-body">On nous le demande souvent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">How Startup Framework works?</h3>
              <p className="text-gray-500 font-body">
                The Generator App is an online tool that helps you to export ready-made templates ready to work as
                your future website. It helps you to combine slides, panels and other components and export it as a
                set of static files: HTML/CSS/JS.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">
                Do you provide hosting with Startup Framework?
              </h3>
              <p className="text-gray-500 font-body">
                No, hosting is on you. You upload the result on your hosting via FTP or using other tools you like.
                You can use any server, just make sure it have a PHP installed in case if you need a contact form.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">What exactly am I buying?</h3>
              <p className="text-gray-500 font-body">
                You're buying an access to the Startup Generator app to export ready-made templates with the rest
                source files included. It's an online tool, not a software. For more details about generator's
                workflow watch this tutorial.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">Are you planning to update Startup Framework?</h3>
              <p className="text-gray-500 font-body">
                We are! Here is the changelog of changes we've made after the release. Thanks our clients who helped
                us to improve our product.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">How Startup Framework works?</h3>
              <p className="text-gray-500 font-body">
                The Generator App is an online tool that helps you to export ready-made templates ready to work as
                your future website. It helps you to combine slides, panels and other components and export it as a
                set of static files: HTML/CSS/JS.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">Do you provide support for customers?</h3>
              <p className="text-gray-500 font-body">
                Yes, we are. Please use our contact us form to chat with us. We DO NOT provide product support via
                Facebook, Twitter or others sources.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaOrder />
    </main>
  )
}
