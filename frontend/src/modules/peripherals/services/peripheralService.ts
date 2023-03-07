import axios from 'axios';

import { IPeripheral } from '../types/peripherals';

const API_URL = '/api/peripherals/';

// Get all Peripherals by User
const getAll = async (token: string) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    return response.data;
  }
};

const createPeripheral = async (periferalData: IPeripheral, token: string) => {
  const response = await axios.post(API_URL, periferalData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    return response.data;
  }
};

const peripheralService = {
  getAll,
  createPeripheral,
};

export default peripheralService;
