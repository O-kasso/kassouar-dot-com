'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/cn'
import {
  useEnvironment,
  type Environment,
  type TransitionOrigin,
  ANIMATION_DURATION,
} from '@/contexts/environment-context'

interface BackgroundProps {
  className?: string
}

export function Background({ className }: BackgroundProps) {
  const { currentEnvironment, isTransitioning, transitionOrigin } = useEnvironment()

  // Track the currently displayed background (what's visible as the base layer)
  const [displayedEnvironment, setDisplayedEnvironment] =
    useState<Environment>(currentEnvironment)
  // Track the environment we're transitioning TO (only set during animation)
  const [transitionTarget, setTransitionTarget] = useState<Environment | null>(null)
  // Track the origin for the current transition
  const [activeOrigin, setActiveOrigin] = useState<TransitionOrigin>({ x: 50, y: 50 })

  const isFirstMount = useRef(true)

  useEffect(() => {
    // Skip animation on first mount
    if (isFirstMount.current) {
      isFirstMount.current = false
      setDisplayedEnvironment(currentEnvironment)
      return
    }

    // If environment changed from what's currently displayed, start transition
    if (currentEnvironment.id !== displayedEnvironment.id && !transitionTarget) {
      setActiveOrigin(transitionOrigin)
      setTransitionTarget(currentEnvironment)
    }
  }, [currentEnvironment.id, displayedEnvironment.id, transitionTarget, transitionOrigin])

  // When transition ends (isTransitioning becomes false), update displayed environment
  // Update base layer first, then remove overlay on next frame to prevent flash
  useEffect(() => {
    if (!isTransitioning && transitionTarget) {
      // First, update the base layer to show the new environment
      setDisplayedEnvironment(transitionTarget)

      // Then, on the next frame, remove the overlay
      // This ensures the base layer has rendered before we remove the overlay
      requestAnimationFrame(() => {
        setTransitionTarget(null)
      })
    }
  }, [isTransitioning, transitionTarget])

  const showTransition = transitionTarget !== null

  return (
    <div className={cn('fixed inset-0 -z-10 overflow-hidden', className)}>
      {/* Base layer: currently displayed background (static) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${displayedEnvironment.backgroundImage})`,
        }}
      />

      {/* Top layer: new background with circular wipe (only during transition) */}
      {showTransition && transitionTarget && (
        <motion.div
          key={transitionTarget.id}
          initial={{ '--mask-size': '0%' } as Record<string, string>}
          animate={{ '--mask-size': '200%' } as Record<string, string>}
          transition={{ duration: ANIMATION_DURATION / 1000, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${transitionTarget.backgroundImage})`,
            maskImage: `radial-gradient(circle at ${activeOrigin.x}% ${activeOrigin.y}%, black calc(var(--mask-size) - 10%), transparent var(--mask-size))`,
            WebkitMaskImage: `radial-gradient(circle at ${activeOrigin.x}% ${activeOrigin.y}%, black calc(var(--mask-size) - 10%), transparent var(--mask-size))`,
          }}
        />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(0, 0, 0, 0.6) 0%, transparent 60%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)
          `,
        }}
      />

      {/* Subtle noise texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
