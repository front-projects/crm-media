'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

import { createSession, loginCheck } from '../requests';
import gsap from 'gsap';
import { registerUser } from './requests';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const formRef = useRef(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<boolean | string | undefined>(false);
  const router = useRouter();
  const params = useSearchParams();

  // Animation
  useEffect(() => {
    const anim = gsap.to(formRef.current, { translateY: 0, opacity: 1 });

    return () => {
      anim.kill();
    };
  }, []);

  const handleRegister = async () => {
    const id = params.get('id');

    try {
      setLoading(true);
      const response = await registerUser(
        {
          email: email,
          password: password,
          nickname: name,
        },
        id,
      );
      if (response) {
        const user = await loginCheck(email, password);
        if (!user) {
          setPassword('');
          return setError('Something went wrong, try again');
        }
        await createSession(user.accessToken, user.refreshToken, user.role);
        setLoading(false);
        gsap.to(formRef.current, {
          translateY: '-100%',
          opacity: 0,
          onComplete: () => router.push('/menu'),
        });
      } else {
        setLoading(false);
        return setError('Something went wrong, try again');
      }
    } catch {
      setLoading(false);
      setError('Wrong login or password');
    }
  };

  return (
    <section className="w-screen h-[100dvh] flex items-center justify-center">
      <form
        ref={formRef}
        className="
        translate-y-20 opacity-0
        bg-gray-600/40 w-[400px] rounded-md p-4 flex flex-col items-center 
        max-sm:w-[90vw] "
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
      >
        <h1 className="w-full text-center p-4 text-2xl">REGISTER</h1>

        <TextField
          id="name-input"
          color="secondary"
          label="Your name"
          required
          variant="outlined"
          sx={{
            width: '80%',
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError('');
          }}
        />

        <TextField
          id="login-input"
          color="secondary"
          label="Login"
          required
          variant="outlined"
          sx={{
            width: '80%',
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
          type="password"
          color="secondary"
          required
          variant="outlined"
          sx={{
            width: '80%',
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
            type="submit"
            color="secondary"
            sx={{ width: '80%' }}
          >
            {loading ? 'Submitting...' : 'Register'}
          </Button>
        </div>

        {error && <p className="text-red-600">{error}</p>}
      </form>
    </section>
  );
}
