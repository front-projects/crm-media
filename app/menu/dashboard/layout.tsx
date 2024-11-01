// import DateRange from '@/app/components/dashboard/DateRange/DateRange';
import DateRange from '@/app/components/dashboard/DateRange/DateRange';
import DashboardNavigation from '@/app/components/dashboard/Navigation/DashboardNavigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-3/4 max-sm:w-[95vw]">
      <div className="w-full flex flex-col items-center">
        <DashboardNavigation />
        <div className="w-full flex justify-center py-3">
          <DateRange />
        </div>

        {children}
      </div>
    </section>
  );
}
