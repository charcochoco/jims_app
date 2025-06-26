"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function AdminFormulaPage() {
  const { toast } = useToast()

  const [formulas, setFormulas] = useState<
    { id: number; name: string; price: string; description: string }[]
  >([])

  const fetchFormulas = async () => {
    const res = await fetch("/api/formulas")
    const data = await res.json()
    setFormulas(data)
  }

  useEffect(() => {
    fetchFormulas()
  }, [])

  const handleChange = (id: number, field: string, value: string) => {
    setFormulas((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: value } : f))
    )
  }

  const handleSave = async () => {
    const res = await fetch("/api/formulas", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formulas),
    })

    if (res.ok) {
      toast({
        title: "Succès",
        description: "Les formules ont été mises à jour.",
      })
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour les formules.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#241f18] font-title">
          Modifier les Formules
        </h1>

        {formulas.map((f) => (
          <div key={f.id} className="bg-white rounded-xl shadow p-6 space-y-4">
            <Input
              value={f.name}
              onChange={(e) => handleChange(f.id, "name", e.target.value)}
              placeholder="Nom"
            />
            <Input
              value={f.price}
              onChange={(e) => handleChange(f.id, "price", e.target.value)}
              placeholder="Prix"
            />
            <Textarea
              value={f.description}
              onChange={(e) => handleChange(f.id, "description", e.target.value)}
              placeholder="Description"
              rows={4}
            />
          </div>
        ))}

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
