'use client'

import { useEffect, useState } from 'react'

type VideoPlayerProps = {
  src: string
  downloadLabel?: string
}

export function VideoPlayer({ src, downloadLabel }: VideoPlayerProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <p style={{ margin: '1.5rem 0', opacity: 0.7 }}>Loading video…</p>
  }

  return (
    <div
      style={{
        margin: '1.5rem 0',
        padding: '1rem',
        border: '1px solid rgba(134, 174, 221, 0.3)',
        borderRadius: '12px',
        background: 'rgba(255,255,255,0.6)',
      }}
    >
      <video
        controls
        width="100%"
        style={{ borderRadius: '8px', boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
        src={src}
      >
        Your browser does not support the video tag. You can <a href={src}>download it here</a>.
      </video>
      {downloadLabel ? (
        <p style={{ marginTop: '0.75rem', fontSize: '0.95rem' }}>
          Download: <a href={src}>{downloadLabel}</a>
        </p>
      ) : null}
    </div>
  )
}
