import type { Metadata } from "next";
import { Geist_Mono, Patrick_Hand, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const patrickHand = Patrick_Hand({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ildiariodistorto.vercel.app"),
  title: {
    default: "Il Diario Distorto",
    template: "%s | Il Diario Distorto",
  },
  description:
    "Il mio sito personale dove condivido i miei scritti, pensieri e progetti.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "Il Diario Distorto",
    title: "Il Diario Distorto",
    description:
      "Il mio sito personale dove condivido i miei scritti, pensieri e progetti.",
    images: ["/assets/immagine_copertina_home.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${poppins.variable} ${geistMono.variable} ${patrickHand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
