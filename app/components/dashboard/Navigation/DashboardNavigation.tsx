'use client';

import { useSearchParams } from 'next/navigation';
import NavItemMyAcc from './NavItemDash';

export default function DashboardNavigation() {
  const params = useSearchParams();
  const start = params.get('start');
  const end = params.get('end');

  const query = start && end ? `?start=${start}&end=${end}` : '';

  return (
    <nav className="border-b-2 p-2 border-gray-600/40 text-xl font-bold text-center w-full flex items-center justify-start max-sm:mt-10 max-sm:text-[13px] max-sm:justify-center">
      <NavItemMyAcc href={`/menu/dashboard/dashboards${query}`}>
        DASHBOARDS
      </NavItemMyAcc>
      <NavItemMyAcc href={`/menu/dashboard/stats${query}`}>STATS</NavItemMyAcc>
      <NavItemMyAcc href={`/menu/dashboard/graphs${query}`}>
        GRAPHS
      </NavItemMyAcc>
    </nav>
  );
}
