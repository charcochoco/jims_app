import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jim's Burger",
    short_name: "Jim's",
    description: "Découvrez les délicieux snacks de Jim's. Commande en ligne et programme de fidélité.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#d1742c",
    icons: [
      {
        src: "/icons/logo-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/logo-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
