import { motion } from 'motion/react'
import type * as React from 'react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { useIsMobile } from '@/hooks'
import { Button } from './button'
import { Text } from './text'
import { MotionView } from './view'

const ORNAMENT_VARIANTS = {
  collapsed: {
    width: 44,
    scale: 1.0,
    transition: {
      delay: 0.8,
      type: 'spring',
      bounce: 0,
    },
  },
  expanded: {
    width: 'fit-content',
    scale: 1.05,
    transition: {
      type: 'spring',
      bounce: 0.06,
      duration: 0.7,
    },
  },
  whileTap: {
    scale: 1,
    type: 'spring',
    bounce: 0.1,
    duration: 0.4,
  },
} as const

export type OrnamentTabProps = {
  id: string
  icon: React.ReactNode
  title: string
}

export type OrnamentProps = {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  tabs: OrnamentTabProps[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

function Ornament({
  children,
  className,
  contentClassName,
  tabs,
  activeTab,
  onTabChange,
}: OrnamentProps) {
  const [tapped, setTapped] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div
      data-ornament="root"
      className={cn(
        'relative flex h-full w-full flex-1 items-center justify-center',
        isMobile && 'flex-col',
        className
      )}
      style={
        {
          '--content-height': 'max(300px,60dvh)',
        } as React.CSSProperties
      }
    >
      {/* Desktop: Vertical Tab Bar on the left */}
      {!isMobile && (
        <MotionView
          material
          variants={ORNAMENT_VARIANTS}
          data-ornament="tabs"
          className="absolute left-4 md:left-8 z-[42] self-center"
          role="tablist"
          initial="collapsed"
          whileHover="expanded"
          whileFocus="expanded"
          whileTap="whileTap"
          onMouseDown={() => setTapped(true)}
          onMouseUp={() => setTapped(false)}
        >
          <div className="flex flex-col items-start gap-2 p-2.5">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                className="group flex w-full items-center justify-stretch rounded-full px-[10px] before:rounded-full"
                variant={activeTab === tab.id ? 'default' : 'secondary'}
                aria-label={tab.title}
                onClick={() => onTabChange(tab.id)}
              >
                <div
                  className="relative flex-shrink-0 [&_[data-slot='icon']]:size-6 [&_svg]:size-6 group-hover:[&_[data-slot='icon']]:opacity-95 group-hover:[&_svg]:opacity-95"
                  aria-hidden="true"
                >
                  {tab.icon}
                </div>
                <motion.span className="ml-4 flex-1 overflow-hidden text-start">
                  <Text
                    size="title3"
                    className="line-clamp-1 w-fit min-w-[60px] truncate font-medium leading-[24px] opacity-60 group-hover:opacity-95"
                  >
                    {tab.title}
                  </Text>
                </motion.span>
              </Button>
            ))}
          </div>
        </MotionView>
      )}

      {/* Content Area */}
      <MotionView
        data-ornament="content"
        animate={tapped ? 'whileTap' : 'initial'}
        variants={{
          initial: {
            scale: 1,
            transition: {
              type: 'spring',
              bounce: 0.1,
              duration: 0.4,
            },
          },
          whileTap: {
            scale: 0.992,
            transition: {
              type: 'spring',
              bounce: 0.1,
              duration: 0.4,
            },
          },
        }}
        className={cn(
          'relative overflow-visible',
          contentClassName
        )}
      >
        {children}
      </MotionView>

      {/* Mobile: Horizontal Tab Bar at the bottom */}
      {isMobile && (
        <MotionView
          material
          data-ornament="tabs-mobile"
          className="mt-6 z-[42]"
          role="tablist"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-1 px-2 py-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                className="group flex items-center justify-center rounded-full px-3 before:rounded-full"
                variant={activeTab === tab.id ? 'default' : 'secondary'}
                aria-label={tab.title}
                onClick={() => onTabChange(tab.id)}
              >
                <div
                  className="relative flex-shrink-0 [&_[data-slot='icon']]:size-5 [&_svg]:size-5"
                  aria-hidden="true"
                >
                  {tab.icon}
                </div>
              </Button>
            ))}
          </div>
        </MotionView>
      )}
    </div>
  )
}

export { Ornament }
