import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Sidebar } from './components'
import '../../public/css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Player',
  description: 'MP3 music player',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + ` h-screen antialiased`}>

        <div className="flex flex-row">
          <div className="shrink-0">
            <Sidebar />
          </div>
          <div className="grow flex flex-col">
            <div className="grow">
              {children}
            </div>
            <div className="sticky w-content bottom-0 py-4">
              <h2 className="text-xl font-bold tracking-tight text-center">
                Sticky panel
              </h2>
            </div>
          </div>
        </div>

     </body>
    </html>
  )
}
