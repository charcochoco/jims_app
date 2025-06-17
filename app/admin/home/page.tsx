
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function HomeAdmin() {
  return (
    <main>
          <h1>Bienvenue dans l'espace administrateur</h1>
          <Button variant="default">
            <Link href="/admin/scan">Scan</Link>
          </Button>
    </main>
  );
}
