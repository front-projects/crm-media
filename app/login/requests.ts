'use server';

import axios from 'axios';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { LoginCheckResponse, RefreshResponse } from './types';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/auth';

export async function createSession(
  accessToken: string,
  refreshToken: string,
  role: string,
) {
  const accessExpiresAt = new Date(Date.now() + 50 * 60 * 1000);
  const refreshExpiresAt = new Date(Date.now() + 28 * 24 * 60 * 60 * 1000);

  cookies().set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    expires: accessExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
  cookies().set('role', role, {
    httpOnly: true,
    secure: true,
    expires: accessExpiresAt,
    sameSite: 'lax',
    path: '/',
  });

  cookies().set('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    expires: refreshExpiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function refreshSession(
  refreshToken: string,
): Promise<RefreshResponse | void> {
  'use server';
  try {
    const data = await axios.post(
      `${API_URL}/refresh-token`,
      { refreshToken: refreshToken },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return data.data;
  } catch {
    return deleteSesssion();
  }
}

export async function deleteSesssion() {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
  redirect('/login');
}

export const loginCheck = async (
  email: string,
  password: string,
): Promise<LoginCheckResponse | false> => {
  try {
    const response = await axios.post(API_URL + '/login', {
      email: email,
      password: password,
    });
    console.log(response.data);
    return response.data;
  } catch {
    return false;
  }
  // console.log(email, password);
  // return {
  //   accessToken: 'test',
  //   refreshToken: 'test',
  //   role: 'BUYER',
  // };
};
