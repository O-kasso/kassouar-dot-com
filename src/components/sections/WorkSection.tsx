import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'
import { AppIcon, AppIconGrid, Material, Text, Button } from '@/components/core'
import { experiences } from '@/data'

interface WorkDetailProps {
  experience: typeof experiences[0]
  onClose: () => void
}

function WorkDetail({ experience, onClose }: WorkDetailProps) {
  // Shopify SVG needs to be scaled down
  const isShopify = experience.company === 'Shopify'
  const logoClass = isShopify ? 'w-[75%] h-[75%] object-contain' : 'w-full h-full object-cover'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Material thickness="thick" className="p-6 md:p-8 relative">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 h-8 w-8"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full overflow-hidden
                bg-white/10 backdrop-blur-xl
                flex items-center justify-center
                shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.2)]
                border border-white/20"
            >
              <img
                src={experience.logo}
                alt={experience.company}
                className={logoClass}
              />
            </div>
            <div>
              <Text size="title1">{experience.displayTitle}</Text>
              <Text variant="secondary" size="subheadline">
                {experience.position}
              </Text>
              <Text variant="tertiary" size="caption1">
                {experience.timeframe}
              </Text>
            </div>
          </div>

          {/* Description */}
          {experience.description && (
            <Text variant="secondary" size="body">
              {experience.description}
            </Text>
          )}

          {/* Technologies */}
          {experience.technologies.length > 0 && (
            <div className="space-y-3">
              <Text size="headline">Technologies</Text>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-sm
                      bg-white/10 border border-white/20
                      text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Material>
    </motion.div>
  )
}

export function WorkSection() {
  const [selectedWork, setSelectedWork] = useState<typeof experiences[0] | null>(null)

  return (
    <AnimatePresence mode="wait">
      {selectedWork ? (
        <WorkDetail
          key="detail"
          experience={selectedWork}
          onClose={() => setSelectedWork(null)}
        />
      ) : (
        <AppIconGrid key="grid">
          {experiences.map((exp) => {
            // Shopify SVG needs to be scaled down (use compact mode)
            const iconMode = exp.company === 'Shopify' ? 'compact' : 'fill'

            return (
              <AppIcon
                key={exp.company}
                icon={exp.logo}
                label={exp.iconLabel}
                onClick={() => setSelectedWork(exp)}
                iconMode={iconMode}
              />
            )
          })}
        </AppIconGrid>
      )}
    </AnimatePresence>
  )
}
