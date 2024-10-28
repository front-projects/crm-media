'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/users';

interface USER {
  email: string;
  password: string;
  nickname: string;
  role: string;
}

export const getProfileInfo = async () => {
  try {
    const TOKEN = cookies().get('accessToken')?.value;

    const response = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data.body;
  } catch {
    return false;
  }
};

export const registerUser = async (user: USER) => {
  try {
    const TOKEN = cookies().get('accessToken')?.value;

    const response = await axios.post(`${API_URL}/save`, user, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    if (response) {
      return true;
    }
  } catch {
    return false;
  }
};
