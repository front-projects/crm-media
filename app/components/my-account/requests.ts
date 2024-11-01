'use server';

import axios from 'axios';

import { cookies } from 'next/headers';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/users/save/';

export const getUrlForRegister = async (role: string) => {
  const TOKEN = cookies().get('accessToken')?.value;

  try {
    const response = await axios.post(
      API_URL + role,
      {},
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    if (response.data) {
      const id = response.data.split('/register/')[1];
      return id;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};
