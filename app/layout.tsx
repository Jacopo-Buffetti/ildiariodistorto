import type { Metadata } from "next";
import { Patrick_Hand, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
});

const poppinsItalic = Poppins({
  variable: "--font-poppins-italic",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
  display: "swap",
  preload: false,
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
      className={`${poppins.variable} ${poppinsItalic.variable} ${patrickHand.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
