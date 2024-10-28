import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function NavItem({
  children,
  href,
  icon,
}: {
  children: ReactNode;
  href: string;
  icon: JSX.Element;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`group flex items-center gap-4 hover:text-purple-600 ${pathname.startsWith(href) ? 'text-purple-600' : ''}`}
    >
      <div className="text-[200%] group-hover:bg-gray-600/40 p-2 rounded-[50%]">
        {icon}
      </div>
      <div className="font-bold">{children}</div>
    </Link>
  );
}
