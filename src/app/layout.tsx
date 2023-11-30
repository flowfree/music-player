import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar, AudioPlayer } from './components'
import '../../public/css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Streaming',
  description: 'MP3 music streaming',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ` h-screen antialiased`}>
        <div className="p-4 pb-20">
          {children}
        </div>
      </body>
    </html>
  )
}
