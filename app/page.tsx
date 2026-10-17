import type { Metadata } from "next";

import ChiSono from "../pages/ChiSono/ChiSono";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  return <ChiSono />;
}
