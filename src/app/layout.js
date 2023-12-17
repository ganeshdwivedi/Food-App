"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Prvider from "./redux/Prvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Food-app",
  description: "Taste the Joy, Share the Love.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Prvider>
        <body className={inter.className}>{children}</body>
      </Prvider>
    </html>
  );
}
