import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header";
import Footer from "./component/Footer";
import { MessageProvider } from "./providers/MessageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: " ZIG",
  description: "Modern invoice generator built with Next.js, Firebase, and Tailwind CSS.",
  icons: {
    icon: "/logo1.png", // Path to your logo in the public folder
    apple: "/logo1.png", // Optional: specifically for iPhones
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: 'light' }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f7f7f7] text-slate-900`}
      >
        <Header />

        
          <MessageProvider>
            {children}
          </MessageProvider>
        
        <Footer />
      </body>
    </html>
  );
}
