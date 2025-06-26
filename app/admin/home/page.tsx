"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QrCode, BarChart, LayoutTemplate, Users } from "lucide-react"
import AdminStats from "@/components/adminStats"
import UserTable from "@/components/userTable"

export default function HomeAdmin() {
  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto space-y-10">
        <h1 className="text-4xl font-bold text-[#241f18] text-center font-title">Dashboard Administrateur</h1>

        {/* Scan rapide */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center text-[#241f18] font-title text-lg font-semibold">
            <QrCode className="mr-2 text-[#d1742c]" />
            Scanner un QR code client
          </div>
          <Link href="/admin/scan">
            <Button className="bg-[#d1742c] text-white hover:bg-[#b86426] font-secondary">
              Accéder au scanner
            </Button>
          </Link>
        </div>

        <AdminStats />

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="flex items-center text-[#d1742c] font-semibold text-lg font-title">
            <LayoutTemplate className="mr-2" />
            Gestion du contenu
          </div>
          <p className="text-sm text-[#241f18] font-secondary">
            Modifiez les textes, images ou données affichées sur le site web via les sections suivantes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-secondary">
            <Link
              href="/admin/content/formule"
              className="border border-[#f1e5d2] bg-[#fdf9f3] hover:bg-[#f8efe4] rounded-xl p-4 transition shadow-sm hover:shadow-md"
            >
              <h3 className="text-md font-semibold text-[#241f18]">🧾 Formule</h3>
              <p className="text-sm text-[#4f473a]">Gérez les formules proposées aux clients.</p>
            </Link>

            <Link
              href="/admin/content/insta"
              className="border border-[#f1e5d2] bg-[#fdf9f3] hover:bg-[#f8efe4] rounded-xl p-4 transition shadow-sm hover:shadow-md"
            >
              <h3 className="text-md font-semibold text-[#241f18]">📸 Post Instagram</h3>
              <p className="text-sm text-[#4f473a]">Ajoutez ou retirez des publications Instagram affichées.</p>
            </Link>

            <Link
              href="/admin/content/info"
              className="border border-[#f1e5d2] bg-[#fdf9f3] hover:bg-[#f8efe4] rounded-xl p-4 transition shadow-sm hover:shadow-md"
            >
              <h3 className="text-md font-semibold text-[#241f18]">🏪 Jim’s Info</h3>
              <p className="text-sm text-[#4f473a]">Modifier les infos de base du restaurant (contact, horaires, etc.).</p>
            </Link>

            <Link
              href="/admin/content/apropos"
              className="border border-[#f1e5d2] bg-[#fdf9f3] hover:bg-[#f8efe4] rounded-xl p-4 transition shadow-sm hover:shadow-md"
            >
              <h3 className="text-md font-semibold text-[#241f18]">ℹ️ À propos</h3>
              <p className="text-sm text-[#4f473a]">Gérez le contenu de la page “À propos”.</p>
            </Link>

            <Link
              href="/admin/content/menu"
              className="border border-[#f1e5d2] bg-[#fdf9f3] hover:bg-[#f8efe4] rounded-xl p-4 transition shadow-sm hover:shadow-md"
            >
              <h3 className="text-md font-semibold text-[#241f18]">🍽️ Menu</h3>
              <p className="text-sm text-[#4f473a]">Ajoutez, modifiez ou retirez des éléments du menu.</p>
            </Link>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="flex items-center text-[#d1742c] font-semibold text-lg font-title">
            <Users className="mr-2" />
            Utilisateurs inscrits
          </div>
          <p className="text-sm text-[#241f18] font-secondary">
            Liste des utilisateurs inscrits sur la plateforme, avec leurs informations principales et leurs points de fidélité.
          </p>
          <UserTable />
        </div>
      </div>
    </main>
  )
}
