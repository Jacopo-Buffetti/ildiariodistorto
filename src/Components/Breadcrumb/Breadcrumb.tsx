import Link from "next/link";

type BreadcrumbProps = {
  currentTitle: string;
};

export default function Breadcrumb({ currentTitle }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-zinc-600">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link
            href="/i-miei-scritti"
            className="transition hover:text-zinc-900 hover:underline"
          >
            I miei scritti
          </Link>
        </li>
        <li aria-hidden="true" className="text-zinc-400">
          /
        </li>
        <li
          className="max-w-[75ch] truncate font-medium text-zinc-800"
          aria-current="page"
          title={currentTitle}
        >
          {currentTitle}
        </li>
      </ol>
    </nav>
  );
}
