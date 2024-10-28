'use client';

import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
// import RegisterUser from './RegisterUser';

import UsersTable from './UsersTable/UsersTable';

export default function UsersList() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col gap-1">
      <h3 className="relative  p-2  text-xl font-bold text-center max-sm:text-start w-full mt-10">
        <Button
          className="absolute right-4 bottom-2"
          variant="contained"
          color="secondary"
          onClick={() => router.push('/menu/my-account/users?register=true')}
        >
          Add new user
        </Button>
      </h3>

      <UsersTable />
    </div>
  );
}
