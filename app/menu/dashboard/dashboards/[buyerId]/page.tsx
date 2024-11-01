'use client';

import ChoiseItem from '@/app/components/dashboard/Dashboard/ChoiseItem';
import DashboardTable from '@/app/components/dashboard/Dashboard/DashboardTable';
import { useState } from 'react';

export default function BuyerDashboardPage() {
  const [activeSection, setActiveSection] = useState('campains');

  return (
    <section className="w-full">
      <nav className="flex w-full p-2 items-center gap-3">
        <ChoiseItem
          active={activeSection == 'campains'}
          onClick={() => setActiveSection('campains')}
        >
          Campains
        </ChoiseItem>
        <ChoiseItem
          active={activeSection == 'adsets'}
          onClick={() => setActiveSection('adsets')}
        >
          Ad sets
        </ChoiseItem>
        <ChoiseItem
          active={activeSection == 'ads'}
          onClick={() => setActiveSection('ads')}
        >
          Ads
        </ChoiseItem>
      </nav>

      <DashboardTable activeSection={activeSection} />
    </section>
  );
}
