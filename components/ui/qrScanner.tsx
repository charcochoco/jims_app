"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { useToast } from "../../hooks/use-toast"

const QRBarcodeScanner = dynamic(() => import("react-qr-barcode-scanner"), {
  ssr: false,
})

export default function QRScanner() {
  const [data, setData] = useState("")
  const { toast } = useToast()

  return (
    <div className="p-4 border rounded-md">
      <QRBarcodeScanner
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) {
            const value = result.getText()
              setData(value)
              toast({
                title: "QR détecté :",
                description: value,
                variant: "destructive",
              })
          }
          if (err) {
            console.error(err)
          }
        }}
      />
      {data && (
        <p className="mt-4 text-center">
          Résultat : <strong>{data}</strong>
        </p>
      )}
    </div>
  )
}
