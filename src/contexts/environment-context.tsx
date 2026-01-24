'use client'

import { createContext, useContext, useState, useRef, useCallback, type ReactNode } from 'react'

export interface Environment {
  id: string
  title: string
  backgroundImage: string
  thumbnailImage: string
}

export interface TransitionOrigin {
  x: number // percentage (0-100)
  y: number // percentage (0-100)
}

export const environments: Environment[] = [
  {
    id: 'tahoe',
    title: '',
    backgroundImage: '/images/environments/tahoe.jpg',
    thumbnailImage: '/images/environments/tahoe-thumb.jpg',
  },
  {
    id: 'catalina',
    title: '',
    backgroundImage: '/images/environments/catalina.jpg',
    thumbnailImage: '/images/environments/catalina-thumb.jpg',
  },
  {
    id: 'mojave-night',
    title: '',
    backgroundImage: '/images/environments/mojave-night.jpg',
    thumbnailImage: '/images/environments/mojave-night-thumb.jpg',
  },
  {
    id: 'big-sur',
    title: '',
    backgroundImage: '/images/environments/big-sur.jpg',
    thumbnailImage: '/images/environments/big-sur-thumb.jpg',
  },
  {
    id: 'desert-tree',
    title: '',
    backgroundImage: '/images/environments/desert-tree.jpg',
    thumbnailImage: '/images/environments/desert-tree-thumb.jpg',
  },
  {
    id: 'sierra',
    title: '',
    backgroundImage: '/images/environments/sierra.jpg',
    thumbnailImage: '/images/environments/sierra-thumb.jpg',
  },
  {
    id: 'rainbow',
    title: '',
    backgroundImage: '/images/environments/rainbow.jpg',
    thumbnailImage: '/images/environments/rainbow-thumb.jpg',
  },
  {
    id: 'green',
    title: '',
    backgroundImage: '/images/environments/green.jpg',
    thumbnailImage: '/images/environments/green-thumb.jpg',
  },
  {
    id: 'orange',
    title: '',
    backgroundImage: '/images/environments/orange.jpg',
    thumbnailImage: '/images/environments/orange-thumb.jpg',
  },
  {
    id: 'earth',
    title: '',
    backgroundImage: '/images/environments/earth.jpg',
    thumbnailImage: '/images/environments/earth-thumb.jpg',
  },
  {
    id: 'wwdc-2018',
    title: '',
    backgroundImage: '/images/environments/wwdc-2018.jpg',
    thumbnailImage: '/images/environments/wwdc-2018-thumb.jpg',
  },
  {
    id: 'splash',
    title: '',
    backgroundImage: '/images/environments/splash.jpg',
    thumbnailImage: '/images/environments/splash-thumb.jpg',
  },
  {
    id: 'noodles-gray',
    title: '',
    backgroundImage: '/images/environments/noodles-gray.jpg',
    thumbnailImage: '/images/environments/noodles-gray-thumb.jpg',
  },
]

// Full animation duration (0% to 200% mask size)
const ANIMATION_DURATION = 2400
// Time until wipe visually covers the screen (~60% of animation, when mask reaches ~120%)
const TRANSITION_LOCK_DURATION = 1400

interface EnvironmentContextValue {
  currentEnvironment: Environment
  setEnvironment: (id: string, origin?: TransitionOrigin) => void
  isTransitioning: boolean
  transitionOrigin: TransitionOrigin
}

const EnvironmentContext = createContext<EnvironmentContextValue | null>(null)

export function EnvironmentProvider({ children }: { children: ReactNode }) {
  const [currentEnvironment, setCurrentEnvironment] = useState<Environment>(environments[environments.length - 1])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [transitionOrigin, setTransitionOrigin] = useState<TransitionOrigin>({ x: 50, y: 50 })
  const transitionTimer = useRef<NodeJS.Timeout | null>(null)

  const setEnvironment = useCallback((id: string, origin?: TransitionOrigin) => {
    // Ignore if already transitioning or selecting the same environment
    if (isTransitioning) return

    const env = environments.find((e) => e.id === id)
    if (env && env.id !== currentEnvironment.id) {
      // Set origin before starting transition
      if (origin) {
        setTransitionOrigin(origin)
      }

      setIsTransitioning(true)
      setCurrentEnvironment(env)

      // Clear any existing timer
      if (transitionTimer.current) {
        clearTimeout(transitionTimer.current)
      }

      // Unlock after wipe visually completes (not full animation duration)
      transitionTimer.current = setTimeout(() => {
        setIsTransitioning(false)
      }, TRANSITION_LOCK_DURATION)
    }
  }, [isTransitioning, currentEnvironment.id])

  return (
    <EnvironmentContext.Provider value={{ currentEnvironment, setEnvironment, isTransitioning, transitionOrigin }}>
      {children}
    </EnvironmentContext.Provider>
  )
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext)
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider')
  }
  return context
}

export { ANIMATION_DURATION }
