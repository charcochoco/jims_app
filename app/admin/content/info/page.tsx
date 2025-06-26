"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

type Info = {
  id: string
  name: string
  siret: string
  email: string
  phone: string
  address: string
  schedules: string
}

export default function AdminJimsInfoPage() {
  const { toast } = useToast()
  const [info, setInfo] = useState<Info | null>(null)

  const fetchInfo = async () => {
    const res = await fetch("/api/jims-information")
    const data = await res.json()
    setInfo(data)
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  const handleChange = (field: keyof Info, value: string) => {
    if (!info) return
    setInfo({ ...info, [field]: value })
  }

  const handleSave = async () => {
    if (!info) return

    const res = await fetch("/api/jims-information", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    })

    if (res.ok) {
      toast({
        title: "Succès",
        description: "Les informations ont été mises à jour.",
      })
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les informations.",
        variant: "destructive",
      })
    }
  }

  if (!info) return <p className="text-center mt-12">Chargement...</p>

  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#241f18] font-title">Modifier les informations Jim&apos;s</h1>

        {[
          { label: "Nom", key: "name" },
          { label: "SIRET", key: "siret" },
          { label: "Email", key: "email" },
          { label: "Téléphone", key: "phone" },
          { label: "Adresse", key: "address" },
        ].map(({ label, key }) => (
          <div key={key} className="space-y-2">
            <label className="block font-semibold text-[#241f18] font-secondary">{label}</label>
            <Input
              value={info[key as keyof Info]}
              onChange={(e) => handleChange(key as keyof Info, e.target.value)}
              placeholder={label}
            />
          </div>
        ))}

        <div className="space-y-2">
          <label className="block font-semibold text-[#241f18] font-secondary">Horaires</label>
          <Textarea
            value={info.schedules}
            onChange={(e) => handleChange("schedules", e.target.value)}
            placeholder="Exemple : Lundi au samedi 12h-14h / 18h-22h"
            rows={4}
          />
        </div>

        <Button
          onClick={handleSave}
          className="bg-[#d1742c] text-white hover:bg-[#b86426] font-secondary"
        >
          Sauvegarder les modifications
        </Button>
      </div>
    </main>
  )
}
