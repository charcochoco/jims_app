"use client"

import PostInsta from "../components/postInsta"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BikeIcon as Motorcycle, ShoppingBag, MapPin, Search, ChevronRight, Instagram } from "lucide-react"
import Offers from "@/components/offers"
import CtaOrder from "@/components/ctaOrder"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Home() {
  const [adresse, setAdresse] = useState("")
  const [posts, setPosts] = useState<string[]>([])

  useEffect(() => {
    fetch("/api/insta-posts")
      .then(res => res.json())
      .then(data => setPosts(data.map((p: any) => p.url)))
  }, [])

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 leading-tight font-title text-[#F5EEDE]">Bienvenue chez Jim's Burger</h1>
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
              src="/images/mascotte.svg"
              alt="Mascotte Jim's burger"
              width={250}
              height={250}
              className="rounded-lg object-cover z-0"
            />
            {/* <img
              src="/gifs/masscote.gif"
              alt="Mascotte Jim's burger animée"
              width={250}
              height={250}
              className="rounded-lg object-cover z-0"
            /> */}
            {/* <video
              autoPlay
              loop
              muted
              playsInline
              width={250}
              height={250}
              className="rounded-lg object-cover z-0"
            >
              <source src="/videos/mascotte.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge les vidéos HTML5.
            </video> */}
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

      <section className="py-16 px-6 md:px-12 lg:px-24 text-center">
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
            <Instagram /> Suis-nous sur Insta !
          </Button>
        </Link>
      </section>

      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-[#241f18] text-[#F5EEDE] text-center">
        <h2 className="text-4xl font-bold mb-10 text-[#F5EEDE] font-title">Avis via Google Maps</h2>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <div className="flex items-start space-x-6">
            <div className="text-start">
              <blockquote className="text-lg text-[#F5EEDE] text-gray-300 font-body">
                "Super snack ! Les produits sont vraiment frais, les portions généreuses et tout est préparé avec soin. On sent la qualité dans chaque bouchée. Le goût est au rendez-vous, et le service est agréable en plus. Franchement, une très bonne adresse que je recommande les yeux fermés."
              </blockquote>
              <p className="mt-4 font-semibold tracking-wider uppercase text-sm text-gray-500 font-secondary">Sofia Touati - Avis via Google Maps</p>
            </div>
          </div>
          <div className="flex items-start space-x-6">
            <div className="text-start">
              <blockquote className="text-lg text-[#F5EEDE] text-gray-300 font-body">
                "vraiment super bon, on y est aller ce soir, les saveurs sont super bien dosé, il propose de très bonne composition !! je recommande"
              </blockquote>
              <p className="mt-4 font-semibold tracking-wider uppercase text-sm text-gray-500 font-secondary">Prune Lecoin - Avis via Google Maps</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[#f5eede] text-[#241f18]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-12 text-center font-title">On nous le demande souvent</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">Où se trouve le restaurant Jim’s à Annecy ?</h3>
              <p className="text-gray-500 font-body">
                Le restaurant Jim’s est situé en plein cœur d’Annecy, à deux pas des rues animées et des principaux lieux de vie de la ville. Facile d’accès à pied ou en transport, il est idéal pour une pause déjeuner rapide ou un repas du soir entre amis. Que vous soyez étudiant, actif du quartier ou simplement de passage, Jim’s vous accueille dans une ambiance décontractée avec des produits frais et une équipe aux petits soins.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">
                Est-ce que Jim’s propose la livraison de burgers à Annecy ?
              </h3>
              <p className="text-gray-500 font-body">
                Oui, Jim’s propose la livraison de burgers à Annecy via les principales plateformes comme Uber Eats et Deliveroo. Que vous soyez chez vous, au bureau ou entre amis au bord du lac, vos burgers préférés sont livrés rapidement, encore chauds et bien garnis. Notre service de livraison est disponible midi et soir, selon les horaires d’ouverture. Pour ceux qui préfèrent passer en coup de vent, la commande en ligne avec click & collect est aussi disponible. Commandez en quelques clics et récupérez votre repas sans attendre.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">Qu’est-ce qui rend les burgers de Jim’s différents des autres ?</h3>
              <p className="text-gray-500 font-body">
                Chez Jim’s, chaque burger est préparé à la commande avec des produits frais, sans compromis. Le pain est moelleux, la viande est sélectionnée avec soin et les recettes sont pensées pour allier goût et générosité. Contrairement à d’autres enseignes, nous privilégions la simplicité et la qualité : pas de surgelé, pas de blabla. Jim’s, c’est un vrai bon burger servi dans une ambiance sincère. Nos formules sont adaptées aux étudiants comme aux gros mangeurs, et notre carte évolue au fil des saisons.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 text-[#241f18] font-body">Quels sont les horaires de Jim’s et y a-t-il des offres spéciales ?</h3>
              <p className="text-gray-500 font-body">
                Jim’s est ouvert tous les jours sauf exceptions, avec un service continu le midi et une ouverture en soirée, notamment pour satisfaire les petites faims tardives. La formule étudiante est disponible en semaine de 11h à 13h (hors vacances, week-ends et jours fériés) à un tarif avantageux. Suivez-nous sur les réseaux sociaux pour connaître les nouveautés, les recettes en édition limitée et les offres spéciales du moment. Que ce soit pour un déjeuner rapide ou un burger de fin de soirée, Jim’s a toujours une bonne raison de vous accueillir.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaOrder />
    </main>
  )
}
