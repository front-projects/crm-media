import MyAccountNavigation from '@/app/components/my-account/Navigation/MyAccountNavigation';
import { cookies } from 'next/headers';

export default async function MyAccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ROLE = cookies().get('role')?.value;

  return (
    <section className="w-3/4 max-sm:w-[95vw]">
      <div className="w-full flex flex-col items-center">
        <MyAccountNavigation ROLE={ROLE} />
        {children}
      </div>
    </section>
  );
}
