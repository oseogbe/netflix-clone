import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Netflixx',
  description: 'A Netflix clone created using Next 13, React, TypeScript, TailwindCSS, Firebase and Stripe.',
  icons: [{ rel: 'icon', url: 'netflixx-icon.png' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
