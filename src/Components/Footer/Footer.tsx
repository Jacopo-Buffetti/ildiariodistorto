const ICON_CLASS = "h-5 w-5 text-zinc-100";

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={ICON_CLASS}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={ICON_CLASS}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function FeatherIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={ICON_CLASS}
      aria-hidden="true"
    >
      <path d="M20 4c-5 1-8 4-9.5 9.5L9 15l1.5-1.5C16 12 19 9 20 4z" />
      <path d="M4 20l6-6" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto flex min-h-[62px] items-center justify-between bg-zinc-950 px-5 text-xs text-zinc-200 sm:px-8">
      <p className="tracking-wide">
        © 2024 Le Mie Parole - Tutti i diritti riservati
      </p>
      <div className="flex items-center gap-5">
        <a
          href="#"
          aria-label="Instagram"
          className="transition-opacity hover:opacity-70"
        >
          <InstagramIcon />
        </a>
        <a
          href="#"
          aria-label="Email"
          className="transition-opacity hover:opacity-70"
        >
          <MailIcon />
        </a>
        <a
          href="#"
          aria-label="Scrivi"
          className="transition-opacity hover:opacity-70"
        >
          <FeatherIcon />
        </a>
      </div>
    </footer>
  );
}
