import axios from 'axios';
import { IGateway, IGatewayEditData } from '../types/gateway';

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

const editGateway = async (data: IGatewayEditData, token: string) => {
  const response = await axios.put(API_URL + data.id, data.data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    return response.data;
  }
};

const deleteGateway = async (id: string, token: string) => {
  const response = await axios.delete(API_URL + id, {
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
  editGateway,
  deleteGateway,
};

export default gatewayService;
