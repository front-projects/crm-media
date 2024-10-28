'use server';

import axios from 'axios';

import { cookies } from 'next/headers';
import { Channel } from './types';

const API_URL = 'https://teslainvestgroup.com:6044/api/v1/channel';

export const getChannels = async (): Promise<Channel[]> => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    const response = await axios.get(API_URL + '/all', {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrayData = response.data.map((el: any) => {
      return {
        ...el,
        priceClick1: el.priceClick[0] ? el.priceClick[0] : 0,
        priceClick2: el.priceClick[1] ? el.priceClick[1] : 0,
        priceClick3: el.priceClick[2] ? el.priceClick[2] : 0,
        priceClick4: el.priceClick[3] ? el.priceClick[3] : 0,
        priceClick5: el.priceClick[4] ? el.priceClick[4] : 0,
        priceClick6: el.priceClick[5] ? el.priceClick[5] : 0,
        pricePDP1: el.pricePDP[0] ? el.pricePDP[0] : 0,
        pricePDP2: el.pricePDP[1] ? el.pricePDP[1] : 0,
        pricePDP3: el.pricePDP[2] ? el.pricePDP[2] : 0,
        pricePDP4: el.pricePDP[3] ? el.pricePDP[3] : 0,
        pricePDP5: el.pricePDP[4] ? el.pricePDP[4] : 0,
        pricePDP6: el.pricePDP[5] ? el.pricePDP[5] : 0,
      };
    });
    return arrayData;
  } catch {
    throw new Error('Error fetching');
  }
  //   }
  // return [
  //   {
  //     id: 0,
  //     channelId: 'id31123332',
  //     title: 'Test Channel',
  //     priceClick1: 1.05,
  //     priceClick2: 2.44,
  //     priceClick3: 3.55,
  //     priceClick4: 4.44,
  //     priceClick5: 5.66,
  //     priceClick6: 6.22,
  //     pricePDP: 0,
  //   },
  // ];
};

export const addNewChannel = async (name: string, id: string | number) => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    await axios.post(
      API_URL + '/create',
      {
        channelId: id,
        title: name,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    );
    return true;
  } catch {
    return false;
  }
};

export const deleteChannelById = async (id: string | number) => {
  const TOKEN = cookies().get('accessToken')?.value;
  try {
    await axios.delete(API_URL + '/delete/{id}?id=' + id, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error deleting');
  }
};

export const updateChannelById = async (
  id: string | number,
  channel: Channel,
) => {
  const TOKEN = cookies().get('accessToken')?.value;
  const update = {
    priceClick: [
      +channel.priceClick1,
      +channel.priceClick2,
      +channel.priceClick3,
      +channel.priceClick4,
      +channel.priceClick5,
      +channel.priceClick6,
    ],
    pricePDP: [
      +channel.pricePDP1,
      +channel.pricePDP2,
      +channel.pricePDP3,
      +channel.pricePDP4,
      +channel.pricePDP5,
      +channel.pricePDP6,
    ],
  };
  try {
    await axios.put(API_URL + '/update/' + id, update, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error('Error updating');
  }
};
