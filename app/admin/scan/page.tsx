import QRScanner from "@/components/qrScanner"

export default function ScanPage() {
  return (
    <main className="bg-[#fdf9f3] min-h-screen py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-[#241f18] text-center font-title">Scanner un QR Code</h1>
        <QRScanner />
      </div>
    </main>
  )
}
