import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { definitions, termToSlug } from '../glossary/definitions'

interface GlossaryProps {
  term: string
  children?: React.ReactNode
}

export function Glossary({ term, children }: GlossaryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0, translateX: '-50%', arrowLeft: '50%' })
  const triggerRef = useRef<HTMLSpanElement>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  const definition = children || definitions[term]
  const slug = termToSlug(term)

  // Calculate position when opening - with viewport bounds checking
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const popoverWidth = 280 // approximate max-width of popover
      const padding = 12 // min distance from screen edge
      
      const termCenter = rect.left + rect.width / 2
      let left = termCenter + window.scrollX
      let translateX = '-50%'
      let arrowLeft = '50%'
      
      // Check if popover would go off left edge
      if (termCenter - popoverWidth / 2 < padding) {
        left = padding + window.scrollX
        translateX = '0%'
        // Arrow should point to term center relative to popover left edge
        arrowLeft = `${Math.max(12, termCenter - padding)}px`
      }
      // Check if popover would go off right edge
      else if (termCenter + popoverWidth / 2 > viewportWidth - padding) {
        left = viewportWidth - padding + window.scrollX
        translateX = '-100%'
        // Arrow should point to term center relative to popover right edge
        arrowLeft = `${popoverWidth - Math.max(12, viewportWidth - padding - termCenter)}px`
      }
      
      setPosition({
        top: rect.top + window.scrollY - 8,
        left,
        translateX,
        arrowLeft
      })
    }
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        popoverRef.current && !popoverRef.current.contains(target)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close on escape
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  if (!definition) {
    return <span>{term}</span>
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="glossary-term"
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsOpen(!isOpen)}
      >
        {term}
      </span>
      {isOpen && typeof window !== 'undefined' && createPortal(
        <div
          ref={popoverRef}
          className="glossary-popover-portal"
          style={{
            position: 'absolute',
            top: position.top,
            left: position.left,
            transform: `translate(${position.translateX}, -100%)`,
            zIndex: 9999
          }}
        >
          <div className="glossary-popover__title">{term}</div>
          <div className="glossary-popover__content">{definition}</div>
          <Link href={`/glossary/${slug}`} className="glossary-popover__link">
            Learn more →
          </Link>
          <div 
            className="glossary-popover__arrow" 
            style={{ left: position.arrowLeft, transform: 'translateX(-50%)' }}
          />
        </div>,
        document.body
      )}
    </>
  )
}
