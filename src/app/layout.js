import { ReactLenis } from 'lenis/react'
import "./globals.scss";
import Header from './components/Header/Header';
import { ModalProvider } from './components/UI/Modal/ModalProvider';
import Footer from './components/Footer/Footer';
import Script from 'next/script';
import { metadata as siteMetadata } from './data/metadata';

export const metadata = siteMetadata;

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://use.typekit.net/gmt0jou.css" />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
          <Script id="org-jsonld" type="application/ld+json" strategy="afterInteractive">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Heartcore Studio',
              url: 'https://heartcore.studio',
              logo: 'https://heartcore.studio/og/og-image.jpg',
              sameAs: [
                'https://www.linkedin.com/company/heartcore-studio'
              ]
            })}
          </Script>
        </head>
        <body>
          <ReactLenis root options={{ lerp: 0.1, duration: 1.1 }} />
          <ModalProvider>
            <Header />
            {children}
            <Footer />
          </ModalProvider>
        </body>
      </html>
    </>
  );
}
