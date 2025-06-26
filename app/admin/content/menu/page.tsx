"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const CATEGORIES = [
  "Menu tacos",
  "Menu burger",
  "Menu sandwich",
  "Salade",
  "Dessert",
  "Bowl",
  "Snack",
  "Softs",
]

export default function AdminMenuPage() {
  const { toast } = useToast()
  const [menuItems, setMenuItems] = useState<any[]>([])
  const [newItem, setNewItem] = useState({ name: "", description: "", priceMenu: "", category: CATEGORIES[0] })
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0])

  const fetchMenu = async () => {
    const res = await fetch("/api/menu")
    const data = await res.json()
    setMenuItems(data)
  }

  useEffect(() => {
    fetchMenu()
  }, [])

  const handleChange = (id: number, field: string, value: string) => {
    setMenuItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const handleSave = async (id: number) => {
    const item = menuItems.find(item => item.id === id)
    const res = await fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
    if (res.ok) {
      toast({ title: "Modifié avec succès" })
    } else {
      toast({ title: "Erreur", variant: "destructive" })
    }
  }

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    if (res.ok) {
      toast({ title: "Supprimé avec succès" })
      fetchMenu()
    }
  }

  const handleAdd = async () => {
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
    if (res.ok) {
      toast({ title: "Ajouté avec succès" })
      setNewItem({ name: "", description: "", priceMenu: "", category: selectedCategory })
      fetchMenu()
    }
  }

  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-title font-bold text-[#241f18]">Modifier les éléments du menu</h1>
        <p className="text-[#241f18] font-secondary text-sm">
          Vous pouvez ajouter un nouvel élément dans n’importe quelle catégorie. Puis utilisez la section ci-dessous pour afficher et modifier les items existants.
        </p>

        {/* Ajout */}
        <div className="space-y-2 bg-white p-4 rounded-xl shadow">
          <h2 className="font-bold font-title text-lg">Ajouter un nouvel élément</h2>
          <Input placeholder="Nom" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
          <Textarea placeholder="Description" value={newItem.description} onChange={e => setNewItem({ ...newItem, description: e.target.value })} />
          <Input placeholder="Prix" value={newItem.priceMenu} onChange={e => setNewItem({ ...newItem, priceMenu: e.target.value })} />
          <select
            value={newItem.category}
            onChange={e => {
              setNewItem({ ...newItem, category: e.target.value })
            }}
            className="w-full border p-2 rounded-md font-secondary"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <Button className="bg-[#d1742c] text-white" onClick={handleAdd}>Ajouter</Button>
        </div>

        {/* Modification - avec dropdown ici */}
        <div className="bg-white p-4 rounded-xl shadow space-y-4">
          <div className="flex flex-col gap-2">
            <label className="font-title text-lg font-bold text-[#d1742c]">Modifier les items existants</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full border p-2 rounded-md font-secondary"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <h2 className="text-md font-semibold text-[#241f18] font-secondary mt-4">
            Items de la catégorie “{selectedCategory}”
          </h2>

          {menuItems.filter(i => i.category === selectedCategory).map(item => (
            <div key={item.id} className="space-y-2 border-b-2 border-[#d1742c] pb-4">
              <Input value={item.name} onChange={e => handleChange(item.id, "name", e.target.value)} />
              <Textarea value={item.description || ""} onChange={e => handleChange(item.id, "description", e.target.value)} />
              <Input value={item.priceMenu || ""} onChange={e => handleChange(item.id, "priceMenu", e.target.value)} />
              <div className="flex gap-2">
                <Button onClick={() => handleSave(item.id)} className="bg-green-600 text-white">Sauvegarder</Button>
                <Button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white">Supprimer</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
