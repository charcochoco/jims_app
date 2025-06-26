"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useToast } from "@/hooks/use-toast"
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
        description: `${json.user.firstName} ${json.user.lastName} (${json.user.email})`,
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
      const res = await fetch(`/api/users/loyalty/add-loyalty`, {
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
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="text-[#d1742c] font-semibold text-lg font-title flex items-center">
        📷 Scanner un QR code client
      </div>

      <div className="rounded-md overflow-hidden border border-gray-200 w-full h-[300px] sm:h-[400px]">
        <QRBarcodeScanner
          width="100%"
          height="100%"
          delay={1000}
          onUpdate={(err, result) => {
            if (result) handleScan(result.getText())
            if (err && (err as Error).message !== "No MultiFormat Readers were able to detect the code.") {
              console.error(err)
            }
          }}
        />
      </div>


      {loading && (
        <div className="flex items-center text-[#d1742c] space-x-2 font-secondary">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Chargement...</span>
        </div>
      )}

      {user && (
        <div className="space-y-3 font-secondary text-[#241f18]">
          <p>👤 <strong>{user.firstName} {user.lastName}</strong> ({user.email})</p>
          <p>🎁 Points actuels : <strong>{user.loyaltyPoints}</strong></p>

          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium">Montant de la commande (€)</label>
            <div className="flex space-x-2">
              <Input
                id="amount"
                type="number"
                placeholder="Ex : 12.90"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <Button
                onClick={handleAddPoints}
                disabled={!amount || loading}
                className="bg-[#d1742c] text-white hover:bg-[#b86426] font-secondary"
              >
                Créditer
              </Button>
            </div>
          </div>
        </div>
      )}

      {user && user.loyaltyPoints >= 100 && (
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-medium text-[#241f18]">Récompense</label>
          <Button
            onClick={async () => {
              setLoading(true)
              try {
                const res = await fetch(`/api/users/loyalty/redeem-menu`, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ userId: user.id }),
                })
                const result = await res.json()
                if (!res.ok) throw new Error(result.message)

                toast({ title: "Menu offert 🎉", description: result.message })
                setUser({ ...user, loyaltyPoints: result.loyaltyPoints })
              } catch (err: any) {
                toast({ title: "Erreur", description: err.message, variant: "destructive" })
              } finally {
                setLoading(false)
              }
            }}
            disabled={loading}
            className="bg-[#d1742c] text-white hover:bg-[#b86426] font-secondary"
          >
            🎁 Offrir un menu (−100 points)
          </Button>
        </div>
      )}


    </div>
  )
}
