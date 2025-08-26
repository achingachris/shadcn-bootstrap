import type React from "react"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { PWAProvider } from "@/components/pwa-provider"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

export const metadata: Metadata = {
  title: {
    default: "HAAAFLA - Events & Ticketing Platform",
    template: "%s | HAAAFLA",
  },
  description:
    "Discover and book amazing events across East Africa with HAAAFLA. From music festivals to business conferences, cultural celebrations to tech meetups - Ukiona vyaelea, jua vimeundwa.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: [
    "events",
    "tickets",
    "East Africa",
    "entertainment",
    "culture",
    "music",
    "business",
    "conferences",
    "festivals",
    "Kenya",
    "Tanzania",
    "Uganda",
    "Rwanda",
    "Burundi",
    "event booking",
    "ticket sales",
    "HAAAFLA",
  ],
  authors: [{ name: "HAAAFLA Team", url: "https://haaafla.com" }],
  creator: "HAAAFLA",
  publisher: "HAAAFLA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://haaafla.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haaafla.com",
    title: "HAAAFLA - Events & Ticketing Platform",
    description:
      "Discover and book amazing events across East Africa with HAAAFLA. From music festivals to business conferences, cultural celebrations to tech meetups.",
    siteName: "HAAAFLA",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "HAAAFLA Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HAAAFLA - Events & Ticketing Platform",
    description: "Discover and book amazing events across East Africa with HAAAFLA.",
    images: ["/icon-512x512.png"],
    creator: "@haaafla",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5DBC85" },
    { media: "(prefers-color-scheme: dark)", color: "#5DBC85" },
  ],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: "cover",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HAAAFLA",
  },
  applicationName: "HAAAFLA",
  category: "entertainment",
  classification: "Events and Ticketing Platform",
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "HAAAFLA",
    "msapplication-TileColor": "#5DBC85",
    "msapplication-config": "/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${workSans.variable}`} suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon-192x192.png" />
        <link rel="mask-icon" href="/icon-192x192.png" color="#5DBC85" />
        <meta name="msapplication-TileColor" content="#5DBC85" />
        <meta name="theme-color" content="#5DBC85" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "HAAAFLA",
              description: "Events and Ticketing Platform for East Africa",
              url: "https://haaafla.com",
              logo: "https://haaafla.com/icon-512x512.png",
              sameAs: ["https://twitter.com/haaafla", "https://facebook.com/haaafla", "https://instagram.com/haaafla"],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: ["English", "Swahili"],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <PWAProvider>
            {children}
            <PWAInstallPrompt />
          </PWAProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
