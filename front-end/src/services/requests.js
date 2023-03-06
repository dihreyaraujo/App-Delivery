import axios from 'axios';

const PORT = 3001;

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || PORT}`,
});

export const postData = async (endpoint, body, headers) => {
  const { data } = await api.post(endpoint, body, headers);
  return data;
};

export const getData = async (endpoint, headers) => {
  const { data } = await api.get(endpoint, headers);
  return data;
};

export const getById = async (endpoint, id) => {
  const { data } = await api.get(`${endpoint}/${id}`);
  return data;
};

export const deleteById = async (endpoint, id, headers) => {
  const { data } = await api.delete(`${endpoint}/${id}`, headers);
  return data;
};

export default api;
