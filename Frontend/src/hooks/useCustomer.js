import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
const setUser = useAuthStore(state => state.setUser);
const axiosCustomer = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}`,
  withCredentials: true,
});

const useAxiosCustomer = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const logout = async () => {
      try {
        const res = await axiosPublic.post(
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
    }
 
}[])
  useEffect(() => {
    axiosCustomer.interceptors.response.use(
      response => response,
      async error => {
        console.log(' interceptor -->', error.response);

        if (error.response?.status === 401 || error.response?.status === 403) {
          logout();
          navigate('/login');
        }

        return Promise.reject(error);
      }
    );
  }, [logout, navigate]);

  return axiosCustomer;
};

export default useAxiosCustomer;
