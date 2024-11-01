'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRangePicker, CustomProvider } from 'rsuite';

export default function DateRange() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Перевіряємо, чи є ширина екрану <= 768 тільки на клієнтській стороні
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const submitHandler = (value: any) => {
    if (value) {
      const start = value[0].getTime();
      const end = value[1].getTime();
      router.push(`?start=${start}&end=${end}`);
    } else {
      router.push(pathname);
    }
  };

  return (
    <CustomProvider theme="dark">
      <DateRangePicker
        format="dd/MM/yyyy HH:mm"
        // size="lg"
        placeholder="Select a date"
        showOneCalendar={isMobile}
        onChange={submitHandler}
      />
    </CustomProvider>
  );
}
