import { type MouseEvent, useCallback } from 'react'
import { motion } from 'motion/react'
import { AppIcon, AppIconGrid } from '@/components/core'
import { environments, useEnvironment } from '@/contexts/environment-context'
import { cn } from '@/lib/cn'

export function EnvironmentsSection() {
  const { setEnvironment, isTransitioning } = useEnvironment()

  const handleClick = useCallback(
    (envId: string, event: MouseEvent<HTMLElement>) => {
      // Get the center of the clicked element
      const rect = event.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Convert to percentage of viewport
      const origin = {
        x: (centerX / window.innerWidth) * 100,
        y: (centerY / window.innerHeight) * 100,
      }

      setEnvironment(envId, origin)
    },
    [setEnvironment]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(isTransitioning && 'pointer-events-none')}
    >
      <AppIconGrid>
        {environments.map((env) => (
          <AppIcon
            key={env.id}
            icon={env.thumbnailImage}
            label={env.title}
            onClick={(e) => handleClick(env.id, e)}
            iconMode="fill"
          />
        ))}
      </AppIconGrid>
    </motion.div>
  )
}
