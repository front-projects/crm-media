import MyAccountInfo from '@/app/components/my-account/My-Account-Info';
import { getProfileInfo } from './requests';

export default async function MyAccountPage() {
  const info = await getProfileInfo();

  if (!info) {
    return <section>Something went wrong</section>;
  }
  return (
    <>
      <MyAccountInfo info={info} />
    </>
  );
}
