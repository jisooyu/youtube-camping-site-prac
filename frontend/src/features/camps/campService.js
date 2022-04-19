import axios from 'axios';
const API_URL = '/api/camps';

const createFormData = async (formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post(API_URL, formData, config);
  return response.data;
};

const getCamps = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get camp
const getCamp = async (campId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + campId, config);

  return response.data;
};

const campService = {
  createFormData,
  getCamps,
  getCamp,
};

export default campService;
