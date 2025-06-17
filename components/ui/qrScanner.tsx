"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { QrReader } from "react-qr-reader"

export default function QRScanner() {
  const [result, setResult] = useState("")
  const { toast } = useToast()

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-4">Scanner un QR Code</h2>

      <QrReader
        constraints={{ facingMode: "environment" }}
        scanDelay={300}
        onResult={(scanResult, error) => {
          if (scanResult) {
            const value = scanResult.getText?.()
            if (value && value !== result) {
              setResult(value)
              toast({
                title: "QR Code détecté",
                description: value,
              })
            }
          }

          if (error) {
            console.error("Erreur QR:", error)
          }
        }}
        containerStyle={{ width: "100%" }}
      />

      {result && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          Résultat détecté : <span className="text-lg">{result}</span>
        </p>
      )}
    </div>
  )
}
