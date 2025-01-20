import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CS391 File Generator",
  description:
    "Submit your Vercel and GitHub links here to create a text file to submit on Gradescope.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
