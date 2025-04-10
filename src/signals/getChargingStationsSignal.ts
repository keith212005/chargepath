import {signal, useSignal} from '@preact-signals/safe-react';
import axios from 'axios';

const stationList = signal([]);

export const getChargingStationsSignal = async () => {
  const options = {
    method: 'GET',
    url: process.env.OPEN_CHARGE_MAP_BASE_URL,
    params: {key: process.env.OPEN_CHARGE_MAP_API_KEY},
    headers: {Accept: 'application/json'},
  };

  try {
    const {data} = await axios.request(options);
    console.log(data);
  } catch (error) {
    console.error(error);
  }

  return stationList;
};
