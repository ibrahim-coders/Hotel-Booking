import { CiHome } from 'react-icons/ci';
import { GrLogin } from 'react-icons/gr';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useAxiosePublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const axiosPublic = useAxiosePublic();
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleLogin = async e => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setError('');
    try {
      const res = await axiosPublic.post(
        '/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(res.data?.user);
      toast.success(res.data?.message);
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message;

      if (message === 'Email does not match') {
        setEmailError(message);
      } else if (message === 'Password does not match') {
        setPasswordError(message);
      } else {
        setError(message || 'Something went wrong');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-500">StartHotel</h1>
          </Link>
          <p className="text-gray-600 mt-1">Sign in to your account</p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Welcome back</h2>
          <Link
            to="/"
            className="text-blue-500 hover:underline flex items-center text-sm"
          >
            <CiHome size={16} className="mr-1" /> Home
          </Link>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="email@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          {emailError && <p className="text-red-500 text-sm ">{emailError}</p>}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-hotel-blue hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              {passwordError && (
                <p className="text-red-500 text-sm ">{passwordError}</p>
              )}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap cursor-pointer"
          >
            <GrLogin size={18} />
            <span>Sign In</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-hotel-blue hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
