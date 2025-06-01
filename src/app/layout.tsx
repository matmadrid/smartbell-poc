// src/app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '../components/ui/toaster'
console.log("🧪 Toaster typeof:", typeof Toaster);



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smartbell - Gestión de Ranchos Lecheros',
  description: 'Plataforma inteligente para la administración de tu rancho',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}