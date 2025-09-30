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
    const token = localStorage.getItem('access-token');  

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
    
    if (res.status === StatusCodes.OK) {
      return res.data.history; 
    }
    return [];
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
}
const fetchHistoryById = async (id: string | null) => {
  try {
    const res = await axiosSecureApi.get(`/history/${id}`);
    
    if (res.status === StatusCodes.OK) {
      return res.data.history; 
    }
    return [];
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
}


const fetchUserById = async (uid: string | null) => {
  try {
    const res = await axiosSecureApi.get(`/users/${uid}`);

    console.log('res inside api', res);
    

    if (res.status === StatusCodes.OK) {
      return res.data.user;
    }
    return [];
  } catch (err: unknown) {
    console.error(err);
    return [];
  }
};



export {
  axiosApi,
  axiosSecureApi,
  createUserInDatabase,
  fetchHistory,
  fetchHistoryById,
  fetchUserById
}

