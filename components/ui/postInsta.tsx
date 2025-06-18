'use client'
import { useEffect } from 'react'

export default function InstagramEmbed() {
  useEffect(() => {
    // Charge le script d'intégration d'Instagram après le rendu
    const script = document.createElement('script')
    script.setAttribute('src', 'https://www.instagram.com/embed.js')
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DLA8axNIbwa/?img_index=1"
        data-instgrm-version="14"
        style={{ background: '#FFF', border: 0, margin: '1rem auto', maxWidth: '540px' }}
      ></blockquote>
    </div>
  )
}
