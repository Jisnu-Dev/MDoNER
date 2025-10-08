import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DPR Quality Assessment & Risk Prediction System | MDoNER",
  description: "AI-Powered Detailed Project Report Quality Assessment and Risk Prediction System for Ministry of Development of North Eastern Region, India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-poppins), var(--font-inter), system-ui, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
