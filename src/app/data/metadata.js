export const metadata = {
  metadataBase: new URL('https://heartcore.studio'),
  title: {
    default: 'Heartcore Studio | Boutique Web Design & Headless Web Development',
  },
  description: 'Premium web design and custom development studio creating modern, animation-rich sites and seamless headless WordPress experiences for standout brands.',
  applicationName: 'Heartcore Studio',
  keywords: ['Next.js', 'GSAP', 'Web Design', 'Web Development', 'Lenis', 'Web Animations', 'Headless CMS'],
  authors: [{ name: 'Heartcore Studio', url: 'https://heartcore.studio' }],
  creator: 'Kelly Warpechowski',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://heartcore.studio',
    title: 'Heartcore Studio | Boutique Web Design & Headless Web Development',
    description: 'Premium web design and custom development studio creating modern, animation-rich sites and seamless headless WordPress experiences for standout brands.',
    siteName: 'Heartcore Studio',
    images: [{ url: '/og/og-image.jpg', width: 1200, height: 630, alt: 'Heartcore Open Graph' }],
  },
  icons: {
    icon: '/favicons/favicon.png',
    shortcut: '/favicons/favicon.png',
    apple: '/favicons/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};