"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AdminAproposPage() {
    const { toast } = useToast()
    const [sections, setSections] = useState<{ id: number; title: string; description: string }[]>([])

    const fetchSections = async () => {
        const res = await fetch("/api/about")
        const data = await res.json()
        setSections(data)
    }

    useEffect(() => {
        fetchSections()
    }, [])

    const handleChange = (id: number, field: string, value: string) => {
        setSections(prev =>
            prev.map(section => (section.id === id ? { ...section, [field]: value } : section))
        )
    }

    const handleSave = async () => {
        const res = await fetch("/api/about", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sections),
        })

        if (res.ok) {
            toast({
                title: "Succès",
                description: "Les sections ont été mises à jour.",
            })
        } else {
            toast({
                title: "Erreur",
                description: "Impossible de sauvegarder les sections.",
                variant: "destructive",
            })
        }
    }

    return (
        <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-[#241f18] font-title">Modifier la page À propos</h1>

                {sections.map((section) => (
                    <div key={section.id} className="bg-white rounded-xl shadow p-4 space-y-3">
                        <input
                            value={section.title}
                            onChange={(e) => handleChange(section.id, "title", e.target.value)}
                            className="w-full border px-4 py-2 rounded-md font-secondary"
                            placeholder="Titre"
                        />
                        <textarea
                            value={section.description}
                            onChange={(e) => handleChange(section.id, "description", e.target.value)}
                            className="w-full border px-4 py-2 rounded-md font-secondary"
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
