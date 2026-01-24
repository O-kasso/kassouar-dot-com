import { AppIcon, AppIconGrid } from '@/components/core'

const socialApps = [
  {
    id: 'linkedin',
    icon: '/images/logo-linkedin.png',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/okasso',
    iconMode: 'fill' as const,
    bgColor: '#ffffff',
  },
  {
    id: 'github',
    icon: '/images/logo-github.png',
    label: 'GitHub',
    href: 'https://github.com/O-kasso',
    iconMode: 'fill' as const,
    bgColor: '#ffffff',
  },
  {
    id: 'email',
    icon: '/images/logo-mail.png',
    label: 'Email',
    href: 'mailto:omar+websitecontact@kassouar.com',
    iconMode: 'fill' as const,
  },
]

export function SocialSection() {
  return (
    <AppIconGrid>
      {socialApps.map((app) => (
        <AppIcon
          key={app.id}
          icon={app.icon}
          label={app.label}
          href={app.href}
          iconMode={app.iconMode}
          bgColor={'bgColor' in app ? app.bgColor : undefined}
        />
      ))}
    </AppIconGrid>
  )
}
