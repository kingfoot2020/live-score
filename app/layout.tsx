import '../styles/globals.css'
import type { Metadata } from 'next'
import { unstable_noStore as noStore } from 'next/cache'

export const metadata: Metadata = {
  title: 'Yalla Score - Live Sports Updates',
  description: 'Live sports scores and updates with Yalla Score',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Opt out of caching for all data requests in this layout
  noStore();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
