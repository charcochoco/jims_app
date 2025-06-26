"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function AdminStats() {
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/admin/stats")
      const data = await res.json()
      setStats(data)
    }
    fetchStats()
  }, [])

  if (!stats) return <p>Chargement des statistiques...</p>

  const chartData = {
    labels: stats.transactions.map((t: any) => t.date),
    datasets: [
      {
        label: "Points cumulés",
        data: stats.transactions.map((t: any) => t.totalPoints),
        borderColor: "#d1742c",
        backgroundColor: "#f5eede",
        tension: 0.3,
      },
    ],
  }

  return (
    <section className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-[#241f18] font-title">Statistiques générales</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 font-secondary text-[#241f18]">
          <p><strong>👥 Utilisateurs inscrits :</strong> {stats.totalUsers}</p>
          <p><strong>🎁 Points fidélité cumulés :</strong> {stats.totalPoints}</p>
          <div className="mt-4">
            <Line data={chartData} />
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
