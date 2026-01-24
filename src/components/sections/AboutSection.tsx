import { motion } from 'motion/react'
import { FileText } from 'lucide-react'
import { Material, Text } from '@/components/core'
import { profile } from '@/data'

export function AboutSection() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <Material thickness="thick" className="p-8 md:p-10">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-white/20 shadow-xl">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#5ac8f5]/20 to-transparent blur-xl -z-10" />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Text size="largeTitle">
              {profile.name}
            </Text>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Text variant="secondary" size="body" className="max-w-md">
              {profile.taglines[0]}
            </Text>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="space-y-3"
          >
            {profile.bio.map((paragraph, index) => (
              <Text key={index} variant="tertiary" size="callout">
                {paragraph}
              </Text>
            ))}
          </motion.div>

          {/* Resume Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="pt-2"
          >
            <motion.a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-5 py-3 rounded-full
                bg-white/10 backdrop-blur-md border border-white/20
                text-white/90 text-[15px] font-medium
                shadow-[inset_0_0.5px_0_0_rgba(255,255,255,0.15),0_2px_8px_rgba(0,0,0,0.2)]
                hover:bg-white/15 hover:border-white/30 hover:text-white
                transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-4 h-4" />
              Download Resumé
            </motion.a>
          </motion.div>
        </div>
      </Material>
    </motion.div>
  )
}
