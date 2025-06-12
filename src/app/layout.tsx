import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthWrapper from "@/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greenhouse Monitoring System",
  description: "IoT-based automated greenhouse monitoring and control system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthWrapper>
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthWrapper>
      </body>
    </html>
  );
}
