'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { Modal } from '../UI/Modal';
import { registerUser } from '@/app/menu/my-account/requests';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<boolean | string | undefined>(false);
  const router = useRouter();
  const [alignment, setAlignment] = useState<string>('Buyer');
  const queryClient = useQueryClient();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const user = {
        email: email,
        password: password,
        nickname: nickname,
        role: alignment,
      };
      const response = await registerUser(user);
      if (!response) {
        setError('Something went wrong');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        router.push('/menu/my-account/users', { scroll: false });
        queryClient.invalidateQueries({ queryKey: ['users'] });
      }
      setLoading(false);
    } catch {
      setLoading(false);
      setError('Wrong login or password');
    }
  };

  return (
    <Modal>
      <div className="w-full flex flex-col items-center gap-2">
        <h1 className="w-full text-center p-4 text-2xl">REGISTRATION</h1>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          color="secondary"
        >
          <ToggleButton value="Buyer" sx={{ color: 'white' }}>
            BUYER
          </ToggleButton>
          <ToggleButton value="TEAM_LEAD" sx={{ color: 'white' }}>
            TEAM LEAD
          </ToggleButton>
        </ToggleButtonGroup>

        <TextField
          id="login-input"
          color="secondary"
          label="Nickname"
          variant="outlined"
          sx={{
            width: '100%',
            paddingTop: '4px',
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #fff inset',
              WebkitTextFillColor: 'black',
            },
          }}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setError('');
          }}
        />
        <TextField
          id="login-input"
          color="secondary"
          label="Login"
          variant="outlined"
          sx={{
            width: '100%',
            paddingTop: '4px',
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
            '&:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #fff inset',
              WebkitTextFillColor: 'black',
            },
          }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />

        <TextField
          id="password-input"
          label="Password"
          type="text"
          color="secondary"
          variant="outlined"
          sx={{
            width: '100%',
            marginTop: '10px',
            '& .MuiInputBase-input': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'gray',
            },
          }}
          value={password}
          onChange={(e) => {
            setError('');
            setPassword(e.target.value);
          }}
        />
        <div className="py-4 w-full text-center">
          <Button
            variant="contained"
            onClick={handleRegister}
            color="secondary"
            sx={{ width: '80%' }}
          >
            {loading ? 'Submitting...' : 'Register'}
          </Button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
      </div>
    </Modal>
  );
}
