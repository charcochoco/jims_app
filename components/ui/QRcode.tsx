"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling from "qr-code-styling"

interface StyledQRCodeProps {
  value: string
  size?: number
  withDownload?: boolean
}

export default function StyledQRCode({ value, size = 128, withDownload = false }: StyledQRCodeProps) {
  const ref = useRef<HTMLDivElement>(null)
  const qrCodeRef = useRef<QRCodeStyling | null>(null)

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data: value,
      image: "/icons/icon-192x192.png",
      dotsOptions: { color: "#FFA500", type: "rounded" },
      backgroundOptions: { color: "#ffffff" },
      imageOptions: { crossOrigin: "anonymous", margin: 5 },
    })

    qrCodeRef.current = qrCode
    ref.current && qrCode.append(ref.current)

    return () => {
      ref.current && (ref.current.innerHTML = "")
    }
  }, [value, size])

  const handleDownload = () => {
    qrCodeRef.current?.download({
      name: "qr-code",
      extension: "png",
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div ref={ref} />
      {withDownload && (
        <button
          onClick={handleDownload}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
        >
          Télécharger le QR Code
        </button>
      )}
    </div>
  )
}
