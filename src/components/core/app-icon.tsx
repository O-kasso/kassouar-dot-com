import { Children } from 'react'
import { motion } from 'motion/react'
import type * as React from 'react'
import { cn } from '@/lib/cn'
import { useIsMobile } from '@/hooks'
import { Text } from './text'

export interface AppIconProps {
  icon: React.ReactNode
  label: string
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  href?: string
  className?: string
  size?: 'default' | 'large'
  /** Icon display mode: 'default' has standard padding, 'fill' fills the circle, 'compact' has extra padding */
  iconMode?: 'default' | 'fill' | 'compact'
  /** Background color for the icon container. Use for logos with transparency that need a solid background. */
  bgColor?: string
}

function AppIcon({ icon, label, onClick, href, className, size = 'default', iconMode = 'default', bgColor }: AppIconProps) {
  const iconSize = size === 'large' ? 'w-28 h-28' : 'w-24 h-24'

  const getImageClasses = () => {
    switch (iconMode) {
      case 'fill':
        return 'w-full h-full object-cover'
      case 'compact':
        return 'w-full h-full object-contain p-4'
      default:
        return 'w-full h-full object-contain p-3'
    }
  }

  const content = (
    <motion.div
      className={cn(
        'flex flex-col items-center gap-2 cursor-pointer group',
        className
      )}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      <div
        className={cn(
          iconSize,
          'rounded-full overflow-hidden',
          !bgColor && 'bg-white/10 backdrop-blur-xl',
          'flex items-center justify-center',
          'shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]',
          'border border-white/20',
          'transition-all duration-200',
          'group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.3)]',
          'group-hover:border-white/30'
        )}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {typeof icon === 'string' ? (
          <img
            src={icon}
            alt={label}
            className={getImageClasses()}
          />
        ) : (
          <div className={cn(
            iconMode === 'fill' ? '[&_img]:w-full [&_img]:h-full [&_img]:object-cover' : '[&_img]:w-8 [&_img]:h-8',
            '[&_svg]:w-10 [&_svg]:h-10 text-white'
          )}>
            {icon}
          </div>
        )}
      </div>

      {label && (
        <Text
          size="caption1"
          variant="secondary"
          className="text-center max-w-[90px] truncate group-hover:text-white/90 transition-colors"
        >
          {label}
        </Text>
      )}
    </motion.div>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('mailto:') ? undefined : '_blank'}
        rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
        className="no-underline"
      >
        {content}
      </a>
    )
  }

  return content
}

export interface AppIconGridProps {
  children: React.ReactNode
  className?: string
}

// Desktop: 4/5/4 pattern (3 rows, max 13 items)
const DESKTOP_ROW_STRUCTURE = [
  { maxItems: 4, isOffsetRow: true },
  { maxItems: 5, isOffsetRow: false },
  { maxItems: 4, isOffsetRow: true },
]

// Mobile: 2/3/2/3 pattern (4 rows, max 10 items)
const MOBILE_ROW_STRUCTURE = [
  { maxItems: 2, isOffsetRow: true },
  { maxItems: 3, isOffsetRow: false },
  { maxItems: 2, isOffsetRow: true },
  { maxItems: 3, isOffsetRow: false },
]

// Desktop: icon (96px) + gap (48px) = 144px
const DESKTOP_CELL_WIDTH = 144
// Mobile: icon (96px) + gap (28px) = 124px
const MOBILE_CELL_WIDTH = 124

const ROW_HEIGHT = 130

/**
 * Honeycomb grid layout for app icons.
 * Desktop: 4/5/4 pattern (3 rows), Mobile: 2/3/2/3 pattern (4 rows)
 */
function AppIconGrid({ children, className }: AppIconGridProps) {
  const isMobile = useIsMobile()

  const rowStructure = isMobile ? MOBILE_ROW_STRUCTURE : DESKTOP_ROW_STRUCTURE
  const cellWidth = isMobile ? MOBILE_CELL_WIDTH : DESKTOP_CELL_WIDTH
  const halfCell = cellWidth / 2
  const maxItems = rowStructure.reduce((sum, row) => sum + row.maxItems, 0)

  const childArray = Children.toArray(children).slice(0, maxItems)

  let itemIndex = 0
  const rows = rowStructure.map((rowConfig) => {
    const items = childArray.slice(itemIndex, itemIndex + rowConfig.maxItems)
    itemIndex += rowConfig.maxItems
    return {
      items,
      ...rowConfig,
    }
  })

  // Width based on widest row (desktop: 5, mobile: 4)
  const maxRowItems = Math.max(...rowStructure.map(r => r.maxItems))
  const gridWidth = cellWidth * maxRowItems

  return (
    <motion.div
      className={cn('flex flex-col items-center gap-y-2 p-8', isMobile && 'p-4', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={{
        minHeight: ROW_HEIGHT * rowStructure.length + 8 * (rowStructure.length - 1),
      }}
    >
      {rows.map((row, rowIdx) => (
        <div
          key={rowIdx}
          className="relative flex"
          style={{
            width: gridWidth,
            paddingLeft: row.isOffsetRow ? halfCell : 0,
            paddingRight: row.isOffsetRow ? halfCell : 0,
            minHeight: ROW_HEIGHT,
          }}
        >
          {row.items.map((item, itemIdx) => (
            <div
              key={itemIdx}
              className="flex justify-center"
              style={{ width: cellWidth }}
            >
              {item}
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  )
}

export { AppIcon, AppIconGrid }
