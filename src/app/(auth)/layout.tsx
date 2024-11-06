import { ClerkProvider } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";
import { Poppins } from "next/font/google";
import { dark } from '@clerk/themes';
import '../globals.css';


const poppins = Poppins({ weight: '400', style: 'normal', subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Threads",
  description: "Meta Threads Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark, variables: { colorPrimary: 'green' } }}>
      <html lang="en">
        <body className={`${poppins.className} bg-dark-1`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
  }
