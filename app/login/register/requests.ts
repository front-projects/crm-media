'use server';

import axios from 'axios';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/users/register';

interface RegisterRequest {
  email: string;
  password: string | number;
  nickname: string;
}

export const registerUser = async (
  data: RegisterRequest,
  token: string | null,
) => {
  try {
    const response = await axios.post(API_URL + token, data);
    console.log(response);
    return true;
    // if (response.data == 'CREATED') {
    //   return true;
    // } else {
    //   return false;
    // }
  } catch {
    return false;
  }
};
