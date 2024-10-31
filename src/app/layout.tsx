import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Pedro Lucas - Playground",
  description: "A space where I work on implementing interesting animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased light`}>
        <div className="flex flex-col p-6 md:px-16 md:py-10 lg:px-52 lg:py-20">
          <h1 className="text-blue-600">Playground</h1>
          <h2>A space where I work on implementing cool animations</h2>
          {children}
        </div>
      </body>
    </html>
  );
}
