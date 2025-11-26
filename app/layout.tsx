import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import "./globals.css"

const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kyle Kozlowski - Full-Stack Developer",
  description: "Kyle Kozlowski, freelance self-taught full-stack web developer"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.className} antialiased`}>{children}</body>
    </html>
  )
}
