import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KevinTwitter - Tu red social moderna',
  description: 'Una plataforma social construida con Next.js, Supabase y TypeScript.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`}>
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
