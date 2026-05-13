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
  { label: "CHI SONO", href: "/chi-sono" },
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
        <ul className="flex flex-wrap items-center justify-end gap-4 text-[13px] font-semibold tracking-wide text-zinc-800 sm:gap-8">
          {MENU_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? currentPath === "/"
                : currentPath.startsWith(item.href);
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`border-b-2 pb-1 transition-colors ${
                    isActive
                      ? "border-zinc-700"
                      : "border-transparent hover:border-zinc-400"
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
