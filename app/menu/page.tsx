import type React from "react"
import Image from "next/image"
import Offers from "@/components/offers"
import CtaOrder from "@/components/CtaOrder"

interface MenuItemProps {
    name: string
    description?: string
    price?: string
    priceMenu?: string
    isBold?: boolean
    isUpercase?: boolean
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, priceMenu, isBold, isUpercase = true }) => (
    <div className="mb-3">
        <div className="flex justify-between items-start">
            <h4 className={`font-secondary ${isUpercase ? "uppercase" : ""} ${isBold ? "font-bold" : ""} text-brand-text text-sm md:text-base`}>
                {name} {priceMenu && `   |   ${priceMenu}`}
            </h4>
            {/* <div className="flex justify-end space-x-6 text-right min-w-[80px] md:min-w-[120px]">
                {price && <span className="font-secondary text-brand-text text-sm md:text-base">{price}</span>}
                {priceMenu && <span className="font-secondary text-brand-text text-sm md:text-base">{priceMenu}</span>}
            </div> */}
        </div>
        {description && <p className="text-xs md:text-sm text-brand-text-secondary font-secondary mt-1">{description}</p>}
    </div>
)

const MenuSectionTitle: React.FC<{ title: string }> = ({
    title,
}) => (
    <div className="mb-6">
        <div className="flex justify-between items-center">
            <h3 className="text-2xl md:text-3xl font-title font-bold text-brand-text">{title}</h3>
        </div>
    </div>
)

export default function Menu() {
    return (
        <>
            <main className="py-12 px-6 md:px-12 lg:px-24">
                <div className="container mx-auto">
                    <h1 className="text-5xl md:text-7xl font-title font-bold text-brand-text text-center mb-6">
                        Menu Jim&apos;s
                    </h1>
                    <hr className="border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div>
                            <MenuSectionTitle title="Menu tacos" />
                            <MenuItem name="Simple" description="Viande au choix, Sauce au choix." priceMenu="12€" isBold />
                            <MenuItem
                                name="Chevre Miel"
                                description="Gratiné Chèvre Miel, Viande au choix, Sauce au choix."
                                priceMenu="13,90€"
                                isBold
                            />
                            <MenuItem
                                name="Mozzarella"
                                description="Gratiné Mozzarella, Viande au choix, Sauce au choix."
                                priceMenu="13,90€"
                                isBold
                            />
                            <MenuItem
                                name="Cheddar"
                                description="Gratiné Cheddar, Viande au choix, Sauce au choix."
                                priceMenu="13,90€"
                                isBold
                            />
                            <MenuItem
                                name="Emmental"
                                description="Gratiné Emmental, Viande au choix, Sauce au choix."
                                priceMenu="13,90€"
                                isBold
                            />
                            <div className="my-6">
                                <h4 className="font-secondary text-brand-text font-semibold text-center">Viandes au choix</h4>
                                <p className="text-sm text-brand-text-secondary font-secondary text-center">
                                    Steak - Tenders chicken - Nuggets - Fish - Cordon bleu
                                </p>
                            </div>

                            <hr className="border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />

                            <MenuSectionTitle title="Menu sandwich" />
                            <MenuItem
                                name="Beef"
                                description="Pain boulanger, Steak, Cheddar, Bacon, Salade, Poivron grillé, Confit d'oignon, Oignon frit, Sauce barbecue."
                                priceMenu="13€"
                                isBold
                            />
                            <MenuItem
                                name="L'Andria"
                                description="Pain boulanger, Poulet pané, Roquette, Straciatella, Pesto."
                                priceMenu="13€"
                                isBold
                            />
                            <MenuItem
                                name="Delhia"
                                description="Pain boulanger, Satay, Salade, Tomate, Confit d'oignon, Cream chease, Sauce verte."
                                priceMenu="13€"
                                isBold
                            />
                            <MenuItem
                                name="Roasti"
                                description="Pain boulanger, Poulet pané, Salade, Tomate, Galette de pomme de terre, Cheddar, Confit d'oignon, Sauce burger."
                                priceMenu="14,50€"
                                isBold
                            />
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent" style={{ borderColor: '#d1742c' }} />
                        <div>
                            <MenuSectionTitle title="Menu burger" />
                            <MenuItem
                                name="Classic"
                                description="Bun, Steak, Cheddar, Salade, Cornichon, Confit d'oignon, Ketchup, Moutarde."
                                priceMenu="10€"
                                isBold
                            />
                            <MenuItem
                                name="Green"
                                description="Bun, Poulet pané, Cheddar, Roquette, Confit d'oignon, Sauce verte."
                                priceMenu="11,50€"
                                isBold
                            />
                            <MenuItem
                                name="Avocado"
                                description="Bun, Poulet pané, Cheddar, Salade, Confit d'oignon, Avocat, Mayonnaise."
                                priceMenu="13,50€"
                                isBold
                            />
                            <MenuItem
                                name="Indien"
                                description="Bun, Poulet pané, Cheddar, Salade, Poivron grillé, Confit d'oignon, Curry mango."
                                priceMenu="13,50€"
                                isBold
                            />
                            <MenuItem
                                name="Chevre Miel"
                                description="Bun, Steak, Salade, Confit d'oignon, Chèvre, Miel, Mayonnaise."
                                priceMenu="13,50€"
                                isBold
                            />
                            <MenuItem
                                name="Rustic Beef ou Chicken"
                                description="Bun, Viande au choix, Galette de pomme de terre, Cheddar, Salade, Confit d'oignon, Cornichon, Sauce burger."
                                priceMenu="14,50€"
                                isBold
                            />
                            <MenuItem
                                name="Amerigo"
                                description="Bun, Steak, Cheddar, Salade, Cornichon, Confit d'oignon, Bacon, Oignon frit, Sauce barbecue."
                                priceMenu="15,50€"
                                isBold
                            />

                            <div className="my-6">
                                <h4 className="font-secondary text-brand-text font-semibold text-center">Suppléments</h4>
                                <MenuItem name="Version vergetarien" priceMenu="+2€" isUpercase={false} />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                                    <div>
                                        <div className="mb-3">
                                            <h5 className={`font-secondary uppercase font-bold text-brand-text text-sm md:text-base`}>
                                                Burger & Sandwich
                                            </h5>
                                        </div>
                                        <MenuItem name="Steak" priceMenu="3€" isUpercase={false} />
                                        <MenuItem name="Polet pané" priceMenu="3€" isUpercase={false} />
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <h5 className={`font-secondary uppercase font-bold text-brand-text text-sm md:text-base`}>
                                                Frite
                                            </h5>
                                        </div>
                                        <MenuItem name="Cheddar maison" priceMenu="1,50€" isUpercase={false} />
                                        <MenuItem name="Oignon frit" priceMenu="1,20€" isUpercase={false} />
                                        <MenuItem name="Bacon" priceMenu="2€" isUpercase={false} />
                                        <MenuItem name="Version cajun" priceMenu="offert" isUpercase={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="border-t-2 border-brand-accent pb-6" style={{ borderColor: '#d1742c' }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        <div>
                            <MenuSectionTitle title="Salade" />
                            <MenuItem
                                name="Cesar"
                                description="Salade, Tenders, Copeaux de parmesan, Croûtons, Tomate cerise, Sauce César"
                                priceMenu="12,50€"
                                isBold
                            />
                            <MenuItem
                                name="Burrata"
                                description="Salade, Crème balsamique, Tomate cerise, Burrata, Grenade/Fraise/Nectarine*."
                                priceMenu="14€"
                                isBold
                            />
                            <p className="text-xs text-right text-brand-text-secondary font-sans mt-2">*Selon disponibilité</p>
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                        <div>
                            <MenuSectionTitle title="Dessert" />
                            <MenuItem name="Fondant chocolat" priceMenu="5,50€" isBold />
                            <MenuItem name="Pain perdu" priceMenu="6€" isBold />
                            <MenuItem name="Tiramisu" priceMenu="3,50€" isBold />
                            <MenuItem name="Milkshake Vanille" priceMenu="5€" description="+1€/topping" isBold />
                            <MenuItem name="Glace Ben&Jerry's" priceMenu="3,50€" description="100ml 4,95€ | 465ml 8,50€" isBold />
                        </div>
                    </div>

                    <hr className="border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12">
                        <div className="flex flex-col justify-between">
                            <div>
                                <MenuSectionTitle title="Bowl" />
                                <MenuItem name="Bowl" priceMenu="9,95" description="Viande au choiw, Fromagère maison, Frite, Sauce au choix" isBold />
                            </div>
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                        <div>
                            <MenuSectionTitle title="Snack" />
                            <MenuItem name="Tenders x4" priceMenu="5,90€" isBold />
                            <MenuItem name="Wings x4" priceMenu="5,90€" isBold />
                            <MenuItem name="Satay x4" priceMenu="5,90€" description="Thai - Verte - Grill" isBold />
                            <MenuItem name="Frite" priceMenu="3€" isBold />
                            <MenuItem name="Frite cajun" priceMenu="3€" isBold />
                            <MenuItem name="Patate douce" priceMenu="3,90/ +1,50 menu€" isBold />
                            <p className="font-secondary text-brand-text ml-1 mt-1">Fromagère maison 1,50</p>
                            <p className="font-secondary text-brand-text ml-1">Oignon frit 1,20</p>
                            <p className="font-secondary text-brand-text ml-1">Bacon 2</p>
                        </div>
                        <hr className="block md:hidden border-t-2 border-brand-accent my-6" style={{ borderColor: '#d1742c' }} />
                        <div className="flex flex-col justify-between">
                            <div>
                                <MenuSectionTitle title="Softs" />
                                <MenuItem name="Soda 33cl" priceMenu="2€" isBold />
                                <MenuItem name="Soda 50cl" priceMenu="2,90€" isBold />
                                <MenuItem name="Evian 50cl" priceMenu="2€" isBold />
                            </div>
                        </div>
                    </div>
                </div>

                <Offers />
            </main>
            <CtaOrder />
        </>
    );
}
