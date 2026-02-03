import type { Metadata } from "next";
import { 
  Geist, 
  Geist_Mono, 
  Inter, 
  Bebas_Neue, 
  Poppins, 
  Montserrat, 
  Orbitron 
} from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fonts for caption styles
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});


import { ClerkProvider } from '@clerk/nextjs'
import { AntigravityEffects, PageTransition } from "@/components/providers/AntigravityEffects";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "AI Video Generator",
  description: "Generate videos using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${bebasNeue.variable} ${poppins.variable} ${montserrat.variable} ${orbitron.variable} antialiased`}>
          <AntigravityEffects />
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster position="bottom-right" theme="dark" />
        </body>
      </html>
    </ClerkProvider>
  )
}
