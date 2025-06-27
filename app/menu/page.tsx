"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Offers from "@/components/offers"
import CtaOrder from "@/components/ctaOrder"
import { Loader2 } from "lucide-react"

const CATEGORY_ORDER = [
    "Menu tacos",
    "Menu sandwich",
    "Menu burger",
    "Salade",
    "Dessert",
    "Bowl",
    "Snack",
    "Softs"
]

interface MenuItem {
    id: number
    name: string
    description?: string
    priceMenu?: string
    category: string
}

type DisplayMenuItem = Pick<MenuItem, 'name' | 'description' | 'priceMenu'> & {
  isBold?: boolean
  isUpercase?: boolean
}

const MenuItemComp: React.FC<DisplayMenuItem> = ({
  name,
  description,
  priceMenu,
  isBold,
  isUpercase = true,
}) => (
  <div className="mb-3">
    <div className="flex justify-between items-start">
      <h4
        className={`font-secondary ${isUpercase ? 'uppercase' : ''} ${
          isBold ? 'font-bold' : ''
        } text-brand-text text-sm md:text-base`}
      >
        {name} {priceMenu && `| ${priceMenu}`}
      </h4>
    </div>
    {description && (
      <p className="text-xs md:text-sm text-brand-text-secondary font-secondary mt-1">
        {description}
      </p>
    )}
  </div>
)


const MenuSectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-6">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-3xl font-title font-bold text-brand-text">{title}</h3>
        </div>
    </div>
)

export default function Menu() {
    const [items, setItems] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/menu")
            .then(res => res.json())
            .then(data => {
                setItems(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <main className="bg-[#fdf9f3] min-h-screen flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-[#d1742c]" />
                <p className="ml-4 text-lg text-[#241f18] font-secondary">Chargement du menu...</p>
            </main>
        )
    }

    const groupedItems = CATEGORY_ORDER.reduce((acc: Record<string, MenuItem[]>, category) => {
        acc[category] = items.filter(i => i.category === category)
        return acc
    }, {})

    return (
        <>
            <main className="py-12 px-6 md:px-12 lg:px-24">
                <div className="container mx-auto">
                    <h1 className="text-5xl md:text-7xl font-title font-bold text-brand-text text-center mb-6">
                        Les menus de Jim’s
                    </h1>
                    <hr className="border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div>
                            {/* Menu tacos */}
                            <MenuSectionTitle title="Menu tacos" />
                            {groupedItems["Menu tacos"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}

                            {/* Fixe : viandes */}
                            <div className="my-6">
                                <h4 className="font-secondary text-brand-text font-semibold text-center">Viandes au choix</h4>
                                <p className="text-sm text-brand-text-secondary font-secondary text-center">
                                    Steak - Tenders chicken - Nuggets - Fish - Cordon bleu
                                </p>
                            </div>

                            <hr className="border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />

                            {/* Menu sandwich */}
                            <MenuSectionTitle title="Menu sandwich" />
                            {groupedItems["Menu sandwich"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}
                        </div>

                        <hr className="block md:hidden border-t-2 border-brand-accent" style={{ borderColor: '#d1742c' }} />

                        <div>
                            {/* Menu burger */}
                            <MenuSectionTitle title="Menu burger" />
                            {groupedItems["Menu burger"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}

                            {/* Suppléments - Fixe */}
                            <div className="my-6">
                                <h4 className="font-secondary text-brand-text font-semibold text-center">Suppléments</h4>
                                <MenuItemComp name="Version végétarien" priceMenu="+2€" isUpercase={false} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                    <div>
                                        <h5 className="font-secondary uppercase font-bold text-brand-text text-sm md:text-base mb-3">Burger & Sandwich</h5>
                                        <MenuItemComp name="Steak" priceMenu="3€" isUpercase={false} />
                                        <MenuItemComp name="Poulet pané" priceMenu="3€" isUpercase={false} />
                                    </div>
                                    <div>
                                        <h5 className="font-secondary uppercase font-bold text-brand-text text-sm md:text-base mb-3">Frite</h5>
                                        <MenuItemComp name="Cheddar maison" priceMenu="1,50€" isUpercase={false} />
                                        <MenuItemComp name="Oignon frit" priceMenu="1,20€" isUpercase={false} />
                                        <MenuItemComp name="Bacon" priceMenu="2€" isUpercase={false} />
                                        <MenuItemComp name="Version cajun" priceMenu="offert" isUpercase={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-t-2 border-brand-accent pb-6" style={{ borderColor: '#d1742c' }} />

                    {/* Salade + Dessert */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <div>
                            <MenuSectionTitle title="Salade" />
                            {groupedItems["Salade"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}
                            <p className="text-xs text-right text-brand-text-secondary font-sans mt-2">*Selon disponibilité</p>
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                        <div>
                            <MenuSectionTitle title="Dessert" />
                            {groupedItems["Dessert"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}
                        </div>
                    </div>

                    <hr className="border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />

                    {/* Bowl, Snack, Softs */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
                        <div>
                            <MenuSectionTitle title="Bowl" />
                            {groupedItems["Bowl"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                        <div>
                            <MenuSectionTitle title="Snack" />
                            {groupedItems["Snack"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}
                            {/* Suppléments visuels ajoutés statiquement */}
                            <p className="font-secondary text-brand-text ml-1 mt-1">Fromagère maison 1,50</p>
                            <p className="font-secondary text-brand-text ml-1">Oignon frit 1,20</p>
                            <p className="font-secondary text-brand-text ml-1">Bacon 2</p>
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                        <div>
                            <MenuSectionTitle title="Softs" />
                            {groupedItems["Softs"]?.map(item => (
                                <MenuItemComp key={item.id} {...item} isBold />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
             <Offers />
            <CtaOrder />
        </>
    )
}
