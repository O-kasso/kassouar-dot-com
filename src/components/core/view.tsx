import { motion } from 'motion/react'
import type * as React from 'react'
import { cn } from '@/lib/cn'
import { type GlassThickness, Material, type MaterialProps } from './material'

interface ViewProps extends React.HTMLAttributes<HTMLDivElement> {
  material?: boolean | { thickness?: GlassThickness }
}

function View({ className, material = false, children, ...rest }: ViewProps) {
  if (material) {
    const thickness = typeof material === 'object' ? material.thickness : 'normal'
    return (
      <Material
        thickness={thickness}
        className={cn('overflow-hidden', className)}
        {...(rest as MaterialProps)}
      >
        {children}
      </Material>
    )
  }
  return (
    <div className={cn('overflow-hidden', className)} {...rest}>
      {children}
    </div>
  )
}

const MotionView = motion.create(View)

export { View, MotionView }
export type { ViewProps }
