import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";
import { AuthContextProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { GlobalClickOverlay } from "@/components/layout/GlobalClickOverlay";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "D Tracker | Ultimate Fitness Companion",
    template: "%s | D Tracker",
  },
  description: "The ultimate daily activity and fitness tracker for athletes who demand excellence. Track tasks, fitness metrics, and consistency.",
  keywords: ["fitness", "tracker", "daily tasks", "athlete", "workout", "consistency", "journal"],
  authors: [{ name: "D Tracker Team" }],
  creator: "D Tracker",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://d-tracker.vercel.app",
    title: "D Tracker | Ultimate Fitness Companion",
    description: "The ultimate daily activity and fitness tracker for athletes who demand excellence.",
    siteName: "D Tracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "D Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D Tracker | Ultimate Fitness Companion",
    description: "The ultimate daily activity and fitness tracker for athletes who demand excellence.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-background text-foreground min-h-screen")}>
        <AuthContextProvider>
          <ThemeProvider>
            <AnimatedBackground />
            {children}
            <GlobalClickOverlay />
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
