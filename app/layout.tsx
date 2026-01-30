import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/app/providers/CartProvider'
import { ToastProvider } from '@/app/providers/ToastProvider'

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
          <CartProvider>
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 relative">
              {children}
            </main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}