import axios from 'axios';
const baseUrl = import.meta.env.VITE_BACKENDURL

  const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

  export default instance