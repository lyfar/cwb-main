import type { Metadata } from "next"
import { Cormorant_Garamond, DM_Sans } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { SiteHeader } from "@/components/site/site-header"
import { SiteFooter } from "@/components/site/site-footer"
import { PageTransition } from "@/components/site/page-transition"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
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
              "(()=>{try{const v=localStorage.getItem('cwb-ambient');if(v==='off')document.documentElement.classList.add('no-ambient');}catch{}})();",
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${cormorantGaramond.variable} antialiased`}
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
