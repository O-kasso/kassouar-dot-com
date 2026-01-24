import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import { User, Briefcase, Send, MountainSnow } from 'lucide-react'
import { Ornament, type OrnamentTabProps, Cursor } from '@/components/core'
import { Background } from '@/components/layout'
import {
  AboutSection,
  WorkSection,
  SocialSection,
  EnvironmentsSection,
} from '@/components/sections'
import { EnvironmentProvider } from '@/contexts/environment-context'

const tabs: OrnamentTabProps[] = [
  {
    id: 'about',
    icon: <User data-slot="icon" />,
    title: 'About',
  },
  {
    id: 'work',
    icon: <Briefcase data-slot="icon" />,
    title: 'Work',
  },
  {
    id: 'social',
    icon: <Send data-slot="icon" />,
    title: 'Social',
  },
  {
    id: 'environments',
    icon: <MountainSnow data-slot="icon" />,
    title: 'Environments',
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('about')

  // Keyboard shortcuts: 1-4 to switch tabs
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key
    if (key >= '1' && key <= '4') {
      const index = parseInt(key) - 1
      if (tabs[index]) {
        setActiveTab(tabs[index].id)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutSection />
      case 'work':
        return <WorkSection />
      case 'social':
        return <SocialSection />
      case 'environments':
        return <EnvironmentsSection />
      default:
        return <AboutSection />
    }
  }

  return (
    <EnvironmentProvider>
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8 cursor-none">
        <Cursor />
        <Background />

        <Ornament
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mx-auto"
        >
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {renderContent()}
            </div>
          </AnimatePresence>
        </Ornament>

        {/* Footer */}
        <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Omar Kassouar
          </p>
        </footer>
      </div>
    </EnvironmentProvider>
  )
}

export default App
