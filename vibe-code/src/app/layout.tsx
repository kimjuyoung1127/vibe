import './globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { Space_Grotesk, VT323 } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const vt323 = VT323({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-vt323',
})

export const metadata: Metadata = {
  title: 'Vibe Code',
  description: 'Share Your Coding Vibe',
  // viewport 설정을 metadata 객체로 통합: 서버에서 안전하게 처리
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    // 추가 설정: 필요에 따라 themeColor 등 추가 (예: themeColor: '#0D0A11')
  },
};

// generateViewport() 함수 제거: metadata로 대체하여 클라이언트 충돌 방지

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${vt323.variable}`}>
      <body className="min-h-screen overflow-y-auto">
        <Navbar />
        {children}
      </body>
    </html>
  )
}