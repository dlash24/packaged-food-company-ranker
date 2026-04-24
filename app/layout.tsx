import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Packaged Food Company Ranker",
  description: "Compare Nestle, Kraft Heinz, General Mills, Conagra, and Unilever."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
