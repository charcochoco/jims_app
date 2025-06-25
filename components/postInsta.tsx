'use client'
import { useEffect, useRef } from 'react'

export default function PostInsta({ url }: { url: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scriptAlreadyPresent = document.querySelector('script[src="https://www.instagram.com/embed.js"]')

    if (!scriptAlreadyPresent) {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://www.instagram.com/embed.js')
      script.async = true
      document.body.appendChild(script)
      script.onload = () => {
        // @ts-ignore
        if (window.instgrm) window.instgrm.Embeds.process()
      }
    } else {
      // @ts-ignore
      if (window.instgrm) window.instgrm.Embeds.process()
    }
  }, [url])

  return (
    <div ref={wrapperRef} className="flex justify-center items-center w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          border: 0,
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          background: 'transparent',
        }}
      ></blockquote>
    </div>
  )
}
