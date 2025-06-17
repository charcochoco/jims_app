"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useToast } from "../../hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

const QRBarcodeScanner = dynamic(() => import("react-qr-barcode-scanner"), {
  ssr: false,
})

export default function QRScanner() {
  const [data, setData] = useState("")
  const [user, setUser] = useState<any>(null)
  const [amount, setAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleScan = async (value: string) => {
    setData(value)
    setLoading(true)
    try {
      const res = await fetch(`/api/users/from-qr?code=${encodeURIComponent(value)}`)
      if (!res.ok) throw new Error("Utilisateur non trouvé.")
      const json = await res.json()
      setUser(json.user)
      toast({
        title: "Utilisateur trouvé",
        description: `${json.user.name} (${json.user.email})`,
      })
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" })
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPoints = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/users/add-loyalty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, amount: Number(amount) }),
      })
      const result = await res.json()

      if (!res.ok) throw new Error(result.message)
      toast({ title: "Points ajoutés", description: result.message })
      setUser({ ...user, loyaltyPoints: result.loyaltyPoints })
      setAmount("")
    } catch (err: any) {
      toast({ title: "Erreur", description: err.message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 border rounded-md space-y-4">
      <QRBarcodeScanner
        width={500}
        height={500}
        delay={1000}
        onUpdate={(err, result) => {
          if (result) handleScan(result.getText())
          if (err && (err as Error).message !== "No MultiFormat Readers were able to detect the code.") {
            console.error(err)
          }
        }}
      />

      {loading && (
        <div className="flex items-center text-orange-600 space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Chargement...</span>
        </div>
      )}

      {user && (
        <div className="space-y-2">
          <p>👤 <strong>{user.name}</strong> ({user.email})</p>
          <p>🎁 Points actuels : <strong>{user.loyaltyPoints}</strong></p>

          <div className="flex space-x-2 items-center">
            <Input
              type="number"
              placeholder="Montant de la commande (€)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button onClick={handleAddPoints} disabled={!amount || loading}>
              Créditer
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
