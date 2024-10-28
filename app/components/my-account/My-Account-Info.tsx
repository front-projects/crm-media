import { FaUserCircle } from 'react-icons/fa';
// import ShowPassword from './ShowPassword';
import CopyText from './CopyText';
import LogoutButton from './LogoutButton';

export interface InfoUser {
  nickname: string;
  email: string;
  id?: string;
}
export default async function MyAccountInfo({ info }: { info: InfoUser }) {
  return (
    <>
      <div className="mt-4 flex flex-col items-start gap-6 w-max bg-gray-600/20 p-4 px-10 rounded-md shadow-xl">
        <div className="text-[400%] text-purple-600 self-center">
          <FaUserCircle />
        </div>
        <div className="w-max">
          <span className="text-gray-600">Nickname:</span> {info?.nickname}
        </div>
        <div>
          <span className="text-gray-600">Login:</span> {info?.email}
        </div>
        {/* <div>
          <span className="text-gray-600">Password:</span>
          <ShowPassword password={info?.password} />
        </div> */}
        <div className="w-full">
          <span className="text-gray-600">Your ID:</span>{' '}
          <CopyText text={info?.id} />
        </div>
        <LogoutButton />
      </div>
    </>
  );
}
