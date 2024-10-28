'use client';
import { deleteSesssion } from '@/app/login/requests';
import { Button } from '@mui/material';

export default function LogoutButton() {
  const logoutHandler = async () => {
    await deleteSesssion();
  };

  return (
    <div className="self-center flex items-center justif-center">
      <Button variant="contained" color="secondary" onClick={logoutHandler}>
        Logout
      </Button>
    </div>
  );
}
