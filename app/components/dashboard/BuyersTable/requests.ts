'use server';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/users';
import axios from 'axios';
import { cookies } from 'next/headers';
import { Buyer } from './types';

export const getBuyers = async (): Promise<Buyer[]> => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    const response = await axios.get(API_URL + '/buyers', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch {
    throw new Error('Error fetching');
  }
};
