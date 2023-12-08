import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AudioPlayer } from './components'
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
        <div>
          {children}
        </div>
        <div className="sticky bottom-0 left-0 mt-12">
          <AudioPlayer />
        </div>
      </body>
    </html>
  )
}
