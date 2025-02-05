import type { Metadata } from "next";
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "CS391 File Generator",
  description:
    "Submit your Vercel and GitHub links here to create a text file to submit on Gradescope.",
};

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}
