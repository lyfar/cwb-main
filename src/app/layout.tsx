import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans, Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { PageTransition } from "@/components/site/page-transition"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "CWB Hong Kong",
  description:
    "Independent licensed custodian and investment management firm in Hong Kong (SFC CE code AFQ783).",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(()=>{try{const v=localStorage.getItem('cwb-ambient');if(v==='off')document.documentElement.classList.add('no-ambient');}catch{}})();(()=>{try{const p=location.pathname.replace(/\\/+$/,'')||'/';document.documentElement.lang=(p==='/ru'||p.startsWith('/ru/'))?'ru':'en';}catch{}})();",
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${cormorantGaramond.variable} ${inter.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          storageKey="cwb-theme"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteHeader />
          <PageTransition>{children}</PageTransition>
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
