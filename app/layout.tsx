import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const xmind = localFont({
  src: "./fonts/xmind/Xmind-Variable.woff2",
  weight: "100 900",
  variable: "--font-xmind",
  display: "swap",
});

export const metadata: Metadata = {
  title: "e-ebeveyn",
  description:
    "Bebekler ve ebeveynler için uyku, beslenme, gelişim, aktiviteler, doktorlar, forumlar ve yapay zekâ asistanı.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${xmind.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
