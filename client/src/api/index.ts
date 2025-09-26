import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
});
