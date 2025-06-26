"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export default function AdminInstaPage() {
  const { toast } = useToast()
  const [posts, setPosts] = useState<{ id: number; url: string }[]>([])

  const fetchPosts = async () => {
    const res = await fetch("/api/insta-posts")
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleChange = (id: number, value: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, url: value } : p))
    )
  }

  const handleSave = async () => {
    const res = await fetch("/api/insta-posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(posts),
    })

    if (res.ok) {
      toast({
        title: "Succès",
        description: "Les posts Instagram ont été mis à jour.",
      })
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les URLs.",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#241f18] font-title">
          Modifier les Posts Instagram
        </h1>

        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow p-4">
            <label className="text-sm text-[#241f18] font-semibold font-secondary block mb-2">
              URL du post #{post.id}
            </label>
            <Input
              value={post.url}
              onChange={(e) => handleChange(post.id, e.target.value)}
              placeholder="https://www.instagram.com/..."
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
