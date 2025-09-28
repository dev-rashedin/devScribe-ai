import axios from 'axios';
import { StatusCodes } from 'http-status-toolkit';

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

 const axiosApi = axios.create({
  baseURL
});


// Create instance
const axiosSecureApi = axios.create({
  baseURL
});

// Attach interceptors once
axiosSecureApi.interceptors.request.use(
  (config) => {
    // ✅ Always grab token from localStorage
    const token = localStorage.getItem('access-token');

    console.log('token inside client api', token);
    

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosSecureApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    // ✅ Handle expired/invalid tokens
    if (status === 401 || status === 403) {
      // Optional: clear token
      localStorage.removeItem('access-token');

      // Optional: force reload or redirect
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  }
);

const createUserInDatabase = async (userInfo: UserInfo) => {
  try {
    const res = await axiosApi.post('/users', userInfo);
    return res;
  } catch (error: unknown) {
    console.error(error);
    throw error;
  }
};

const fetchHistory = async (uid: string, service: string) => {
  try {
    const res = await axiosSecureApi.get(`/history/${service}/${uid}`);
    console.log('res inside fetchHistory api', res);
    
    if (res.status === StatusCodes.OK) {
      return res.data; 
    }
    return [];
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
}


export {
  axiosApi,
  axiosSecureApi,
  createUserInDatabase,
  fetchHistory
}

