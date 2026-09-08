import type { Metadata } from "next";
import { Manrope, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";

const manrope = Manrope({
  variable: "--font-inter", // keep CSS var name so globals.css font-sans mapping works
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Neenja",
    template: "%s | Neenja",
  },
  description:
    "Neenja — career platform with ATS resume scanning, career profiles, job applications, and financial tracking.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-dvh flex-col bg-background text-foreground">
        <AnnouncementBanner />
        <div className="flex min-h-0 flex-1">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
