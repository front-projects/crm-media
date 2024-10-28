'use server';

import axios from 'axios';

import { cookies } from 'next/headers';
import { User } from './types';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/users';

export const getUsers = async () => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    const response = await axios.get(API_URL + '/workers', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    return response.data;
  } catch {
    throw new Error('Error fetching');
  }
};

export const deleteUserById = async (id: string | number) => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    await axios.delete(API_URL + '/delete/' + id, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch {
    throw new Error('Error deleting');
  }
};

export const updateUserById = async (id: string | number, user: User) => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    const updatedUser = {
      email: user.email,
      nickname: user.nickname,
      role: user.role,
    };
    await axios.put(API_URL + '/update/{id}?id=' + id, updatedUser, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error updating');
  }
};

export const setTeamLead = async (
  buyerId: string | number,
  leadId: string | number | undefined,
) => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    const update = {
      buyerId: buyerId,
      teamLeadId: leadId,
    };
    await axios.post(API_URL + '/distribution', update, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error updating');
  }
};
