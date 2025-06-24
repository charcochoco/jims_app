"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Erreur inconnue")

      toast({ title: "Message envoyé", description: data.message })
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[#fdf9f3] py-16 px-6 md:px-12 lg:px-24 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-[#241f18] mb-4 text-center font-title">Contactez-nous</h1>
        <p className="text-gray-600 text-center mb-10  font-secondary">
          Une question, une suggestion ou juste envie de dire bonjour ? Laissez-nous un message, on vous répondra vite !
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-[#d1742c] focus:ring-[#d1742c]"
          />
          <Input
            name="email"
            type="email"
            placeholder="Votre email"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-[#d1742c] focus:ring-[#d1742c]"
          />
          <Input
            name="subject"
            placeholder="Sujet"
            value={form.subject}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-[#d1742c] focus:ring-[#d1742c]"
          />
          <Textarea
            name="message"
            placeholder="Votre message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="rounded-lg border-gray-300 focus:border-[#d1742c] focus:ring-[#d1742c]"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-[#d1742c] text-white hover:bg-[#b86426] rounded-lg px-6 py-3 w-full text-lg font-secondary"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Envoyer le message
          </Button>
        </form>
      </div>
    </main>
  )
}
