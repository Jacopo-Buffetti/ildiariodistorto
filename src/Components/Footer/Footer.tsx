function GDPRLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href="/privacy-policy"
        className="cursor-pointer text-white no-underline visited:text-white hover:text-white active:text-white focus:text-white"
      >
        Privacy Policy
      </a>
      <span className="text-white">-</span>
      <a
        href="/terms"
        className="cursor-pointer text-white no-underline visited:text-white hover:text-white active:text-white focus:text-white"
      >
        Termini e Condizioni
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto flex min-h-[62px] items-center justify-between bg-zinc-950 px-5 text-xs text-zinc-200 sm:px-8">
      <p className="tracking-wide">
        © 2026 Il Diario Distorto - Tutti i diritti riservati
      </p>
      <div className="flex items-center gap-5">
        <GDPRLinks />
      </div>
    </footer>
  );
}
