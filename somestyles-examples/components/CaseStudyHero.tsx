'use client'

import Link from 'next/link'
import { MeshGradient } from '@paper-design/shaders-react'
import { useEffect, useState } from 'react'

export function CaseStudyHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="case-hero">
      <div className="case-hero__bg">
        {mounted && (
          <>
            <MeshGradient
              className="case-hero__mesh"
              colors={['#0f172a', '#fad2ad', '#a8bacf', '#86aedd', '#0b1425']}
              speed={0.25}
              distortion={0.55}
              swirl={0.25}
              grainOverlay={0.08}
              style={{ backgroundColor: '#0f172a' }}
            />
            <MeshGradient
              className="case-hero__mesh case-hero__mesh--overlay"
              colors={['#86aedd', '#fad2ad', '#a8bacf', '#0f172a']}
              speed={0.18}
              distortion={0.9}
              swirl={0.5}
              grainOverlay={0.15}
              style={{ backgroundColor: 'transparent' }}
            />
          </>
        )}
        <div className="case-hero__blur" />
      </div>

      <div className="case-hero__content">
        <p className="case-hero__eyebrow">CWB Reconciliation Case Study</p>
        <h1>Start the review</h1>
        <p className="case-hero__lead">
          A focused walkthrough of how we picked SmartStream Air for Hong Kong's regulatory environment - covering compliance,
          integration, agility, and local HK support.
        </p>
        <div className="case-hero__cta-row">
          <Link href="/overview" className="case-hero__cta">
            Begin the review
          </Link>
          <span className="case-hero__cta-note">3 minute read • built for SFC/HKMA expectations</span>
        </div>
      </div>
    </div>
  )
}
