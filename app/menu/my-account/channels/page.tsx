import ChannelsTable from '@/app/components/my-account/ChannelsTable/ChannelsTable';
import { cookies } from 'next/headers';

export default async function Page() {
  const ROLE = cookies().get('role')?.value;
  return (
    <div className="w-full">
      <ChannelsTable ROLE={ROLE} />
    </div>
  );
}
