import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const axiosSequrity = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}`,
  withCredentials: true,
});

const useAxiosSequrity = () => {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    axiosSequrity.interceptors.response.use(
      response => response,
      async error => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );
  }, [logout, navigate]);

  return axiosSequrity;
};

export default useAxiosSequrity;
