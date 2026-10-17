import type { Metadata } from "next";

import ChiSono from "../../pages/ChiSono/ChiSono";

// Questa pagina ha lo stesso contenuto della home:
// diciamo a Google che la versione "ufficiale" è la home.
export const metadata: Metadata = {
  title: "Chi sono",
  alternates: {
    canonical: "/",
  },
};

export default function ChiSonoPage() {
  return <ChiSono />;
}
