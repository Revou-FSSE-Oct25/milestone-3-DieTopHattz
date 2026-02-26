import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ToastProvider } from '@/app/providers/ToastProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'

export const metadata: Metadata = {
  title: 'RevoShop - Your Favorite Online Store',
  description: 'Shop the best products at amazing prices',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <ToastProvider>
          <AuthProvider>
            {/* CartProvider is removed - now using Zustand directly */}
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 relative">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  )
}