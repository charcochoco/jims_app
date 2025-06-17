import QRScanner from "../../../components/ui/qrScanner"

export default function ScanPage() {
  return (
    <main className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">Scanner un QR Code</h1>
      <QRScanner />
    </main>
  )
}
