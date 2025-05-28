import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useAxiosPublic from '../hooks/useAxiosPublic';

const AuthProvider = () => {
  const axiosPublic = useAxiosPublic();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosPublic.get('/auth/userInfo', {
          withCredentials: true,
        });
        if (res.data?.user) {
          setUser(res.data.user);
        }
        console.log(res.data);
      } catch (err) {
        setUser(null);
        console.log(err.message);
      }
    };

    fetchUser();
  }, [setUser]);

  return null;
};

export default AuthProvider;
