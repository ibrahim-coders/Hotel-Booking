import { useEffect } from 'react';
import useAuthStore from '../store/authStore';
import useAxiosePublic from '../hooks/useAxiosPublic';

const AuthProvider = () => {
  const axiosPublic = useAxiosePublic();
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosPublic.get('/auth/userInfo', {
          withCredentials: true,
        });
        console.log('Fetched User:', res.data);
        setUser(res.data);
      } catch (err) {
        console.error('User not authenticated', err);
      }
    };

    fetchUser();
  }, [setUser]);

  return null;
};

export default AuthProvider;
