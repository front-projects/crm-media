'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItemMyAcc({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathname = usePathname();
  const baseHref = href.split('?')[0];
  return (
    <Link
      href={href}
      className={`${pathname.startsWith(baseHref) ? 'bg-gray-600/40' : 'hover:text-purple-600'} p-2 rounded-md px-4`}
    >
      {children}
    </Link>
  );
}
