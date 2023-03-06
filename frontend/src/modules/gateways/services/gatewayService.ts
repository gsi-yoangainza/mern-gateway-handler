import axios from 'axios';
import { IGateway } from '../types/gateway';

const API_URL = '/api/gateways/';

// Get all Gateways by User
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

const createGateway = async (gatewayData: IGateway, token: string) => {
  const response = await axios.post(API_URL, gatewayData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    return response.data;
  }
};

const gatewayService = {
  getAll,
  createGateway,
};

export default gatewayService;
