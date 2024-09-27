import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cliffside Entertainment",
  description:
    "Cliffside Entertainment is an agency that specializes in fostering collaborations with our artists & industry professionals. Explore the team & in-house tool suite for partners.",
  openGraph: {
    type: "website",
    siteName: 'Cliffside Entertainment',
    title: "Cliffside Entertainment",
    description:
      "Cliffside Entertainment is an agency that specializes in fostering collaborations with our artists & industry professionals. Explore the team & in-house tool suite for partners.",
    images: '/linkPreview.png',
    url: 'https://cliffside.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
