import BuyersList from '@/app/components/my-account/BuyersList';
import { getProfileInfo } from '../requests';

export default async function Page() {
  const info = await getProfileInfo();

  return <BuyersList info={info} />;
}
