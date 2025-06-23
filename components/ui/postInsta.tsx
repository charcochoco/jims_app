'use client'
import { useEffect } from 'react'

export default function PostInsta() {
  useEffect(() => {
    // Si le script n'existe pas, on le charge
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://www.instagram.com/embed.js')
      script.async = true
      document.body.appendChild(script)
      script.onload = () => {
        // Quand le script est chargé, on traite les blocs
        // @ts-ignore
        if (window.instgrm) window.instgrm.Embeds.process()
      }
    } else {
      // Si déjà chargé, on force le traitement des nouveaux blocs
      // @ts-ignore
      if (window.instgrm) window.instgrm.Embeds.process()
    }
  }, [])

  return (
    <div className="my-6 flex justify-center">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink="https://www.instagram.com/p/DLA8axNIbwa/?img_index=1"
        data-instgrm-version="14"
        style={{
          background: '#FFF',
          border: 0,
          margin: '1rem auto',
          maxWidth: '540px',
          width: '100%',
          minWidth: '326px',
        }}
      ></blockquote>
    </div>
  )
}
