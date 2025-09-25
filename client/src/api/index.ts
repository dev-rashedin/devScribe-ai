import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
});
