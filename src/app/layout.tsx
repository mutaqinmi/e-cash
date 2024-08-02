import { Inter } from 'next/font/google';
import './globals.css';

const fonts = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: '400'
});

export const metadata = {
  title: 'e-Cash',
  description: 'Aplikasi toko sederhana',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fonts.className}>
      <body>{children}</body>
    </html>
  )
}
