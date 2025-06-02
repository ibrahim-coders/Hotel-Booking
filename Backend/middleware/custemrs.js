import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from './useAuth';

const axiosCustomer = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}`,
  withCredentials: true,
});

const useAxiosCustomer = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const logout = useCallback(async () => {
    try {
      const res = await axiosCustomer.post(
        '/auth/logout',
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
      toast.success(res.data?.message);
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  useEffect(() => {
    const interceptor = axiosCustomer.interceptors.response.use(
      response => response,
      async error => {
        console.log('interceptor -->', error.response);

        if (error.response?.status === 401 || error.response?.status === 403) {
          await logout();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosCustomer.interceptors.response.eject(interceptor); // ক্লিনআপ
    };
  }, [logout, navigate]);

  return axiosCustomer;
};

export default useAxiosCustomer;
