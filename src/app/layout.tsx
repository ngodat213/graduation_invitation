import type { Metadata } from 'next'
import { Playfair_Display, Inter, Space_Grotesk } from 'next/font/google'
import '~/styles/css/index.css'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Graduation Ceremony 2026',
  description: 'Join us for our graduation ceremony on November 21, 2026',
  keywords: ['graduation', 'ceremony', 'celebration', '2026'],
  authors: [{ name: 'Graduation Committee' }],
  openGraph: {
    title: 'Graduation Ceremony 2026',
    description: 'Join us for our graduation ceremony on November 21, 2026',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
