import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ weight: "400", subsets: ['devanagari'] })

export const metadata: Metadata = {
  title: 'Netflixx',
  description: 'A Netflix clone created using Next 13 (App Router), React, TypeScript, TailwindCSS, Firebase and Stripe.',
  icons: [{ rel: 'icon', url: 'netflixx-icon.png' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  )
}
