"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  label: string;
  href: string;
  active?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "HOME", href: "/", active: true },
  { label: "I MIEI SCRITTI", href: "/i-miei-scritti" },
];

export default function Menu() {
  const pathname = usePathname();
  const currentPath = pathname ?? "/";
  return (
    <header className="flex min-h-[72px] items-center justify-between border-b border-zinc-300 px-5 sm:px-8">
      <Link href="/">
        <Image
          src="/assets/logo_il_diario_distorto.png"
          alt="Logo Il Diario Distorto"
          width={150}
          height={50}
          className="h-auto w-[30%]"
        />
      </Link>
      <nav aria-label="Navigazione principale">
        <ul className="list-none flex flex-wrap items-center justify-end gap-4 text-[13px] font-semibold tracking-wide text-zinc-800 sm:gap-8">
          {MENU_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`pb-1 text-zinc-800 transition-colors visited:text-zinc-800 hover:text-zinc-800 active:text-zinc-800 focus:text-zinc-800 ${
                    isActive
                      ? "underline decoration-2 underline-offset-4"
                      : "no-underline hover:no-underline"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
