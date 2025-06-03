import { useEffect } from 'react';
import useAxiosePublic from '../hooks/useAxiosPublic';
import useAuthStore from '../store/authStore';

const AuthProvider = () => {
  const axiosPublic = useAxiosePublic();
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
