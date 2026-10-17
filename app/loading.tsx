import FullPageLoader from "@/Components/FullPageLoader/FullPageLoader";

// Next.js mostra questo file in automatico mentre carica una pagina
// (es. dalla home a "I miei scritti" o all'apertura di uno scritto).
export default function Loading() {
  return <FullPageLoader />;
}
