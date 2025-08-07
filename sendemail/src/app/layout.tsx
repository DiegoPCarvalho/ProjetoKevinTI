import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "Zhaz NF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br"
      suppressHydrationWarning={true}
      data-lt-installed={true}
    >
      <body className="h-full m-0 p-0">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
