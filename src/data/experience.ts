export interface WorkExperience {
  company: string
  displayTitle: string
  iconLabel: string
  position: string
  logo: string
  link: string
  timeframe: string
  description: string
  technologies: string[]
}

export const experiences: WorkExperience[] = [
  {
    company: 'Apple',
    displayTitle: 'Apple',
    iconLabel: 'Apple',
    position: 'Software Engineer, iCloud Platform Client',
    logo: '/images/logo-apple.png',
    link: 'https://www.apple.com/',
    timeframe: 'Sep 2024 - Present',
    description: '',
    technologies: ['Swift', 'Objective-C', 'Xcode', 'XCTest', 'SwiftUI', 'CoreData', 'SDKs', 'Splunk', 'OAuth'],
  },
  {
    company: 'Snap Inc',
    displayTitle: 'Snap Inc',
    iconLabel: 'Snapchat',
    position: 'Software Engineer, Developer Productivity',
    logo: '/images/logo-snapchat.png',
    link: 'https://www.snap.com/',
    timeframe: 'May 2019 - Jan 2024',
    description: 'Built mobile release infrastructure and developer tooling for Snapchat iOS and Android apps.',
    technologies: ['Golang', 'Python', 'Bash', 'Postgres', 'Bazel', 'Buck', 'Gradle', 'Objective-C', 'Kotlin', 'Protobuf', 'BigQuery', 'Codesigning', 'Jenkins'],
  },
  {
    company: 'Connected',
    displayTitle: 'Connected (Thoughtworks Canada)',
    iconLabel: 'Connected',
    position: 'Software Developer, Automation',
    logo: '/images/logo-connected-io.png',
    link: 'https://www.connected.io/',
    timeframe: 'Oct 2017 - Present',
    description: 'Build automated testing and deployment tooling across multiple client projects.',
    technologies: ['Ruby', 'Appium', 'XCUITest', 'Espresso', 'NodeJS', 'TypeScript', 'PHP'],
  },
  {
    company: 'Shopify',
    displayTitle: 'Shopify',
    iconLabel: 'Shopify',
    position: 'Software Developer Intern',
    logo: '/images/logo-shopify.svg',
    link: 'https://www.shopify.ca/',
    timeframe: 'Sep 2016 - Dec 2016',
    description: 'Full-stack development on Shipping team; implemented features and bug fixes in admin UI; expanded test coverage for Shipping microservice.',
    technologies: ['Ruby', 'Rails', 'CSS', 'NodeJS', 'CoffeeScript', 'Microservices', 'ActiveRecord'],
  },
  {
    company: 'VarageSale',
    displayTitle: 'VarageSale',
    iconLabel: 'VarageSale',
    position: 'QA Analyst',
    logo: '/images/logo-varagesale.png',
    link: 'https://www.varagesale.com/',
    timeframe: 'Jun 2014 - Aug 2016',
    description: 'QA on Infrastructure Team focused on Payments and Notifications; automated tasks, maintained staging deployment bot, and designed test cases across web and mobile.',
    technologies: [],
  },
  {
    company: 'VMC Game Labs',
    displayTitle: 'VMC Game Labs (Keywords Studios)',
    iconLabel: 'VMC (Keywords)',
    position: 'Compliance Test Specialist (TRC)',
    logo: '/images/logo-vmc-game-labs.png',
    link: 'https://www.vmc.com/games/',
    timeframe: 'Sep 2011 - Jul 2013',
    description: 'Verified games against Sony\'s Technical Requirements Checklist for PlayStation certification; consulted with clients on compliance throughout development.',
    technologies: [],
  },
]
