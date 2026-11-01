import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexorian AI Content Creator",
  description: "AI-assisted content ideation, scripting, and optimization for YouTube, TikTok, Instagram. Excellence and integrity.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}