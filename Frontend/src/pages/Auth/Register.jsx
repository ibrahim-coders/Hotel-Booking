import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa6';
import { CiHome } from 'react-icons/ci';
import useAxiosePublic from '../../hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const axiosPublic = useAxiosePublic();
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);
  const location = useLocation();
  const handleRegister = async e => {
    e.preventDefault();

    if (password.length < 8) {
      setError(
        'At least 8 characters, include a number and special character.'
      );
      return;
    }
    try {
      const response = await axiosPublic.post(
        '/auth/register',
        {
          fullName,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUser(response.data?.user);
      toast.success(response.data?.message || 'Registration Successful');
      const redirectTo = location.state?.from?.pathname || '/';
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://img.freepik.com/free-photo/popular-resort-amara-dolce-vita-luxury-hotel-with-pools-water-parks-recreational-area-along-sea-coast-turkey-sunset-tekirova-kemer_146671-18759.jpg?uid=R195459256&ga=GA1.1.687474419.1743077461&semt=ais_hybrid&w=740)',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <div className="w-full max-w-md bg-gradient-to-b from-sky-50 to-white flex flex-col p-6 sm:p-8 rounded-xl shadow-md relative z-10">
        <div className="text-center mb-6">
          <Link to="/">
            <h1 className="text-3xl font-bold text-blue-500">StartHotel</h1>
          </Link>
          <p className="text-gray-600 mt-1">Create your account</p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Sign Up</h2>
            <Link
              to="/"
              className="text-blue-500 hover:underline flex items-center text-sm"
            >
              <CiHome size={16} className="mr-1" /> Home
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            Enter your details to create a new account
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="John Doe"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="email..."
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 pr-10"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>
            <div className="text-xs">
              {error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <p className="text-gray-500 mt-1">
                  At least 8 characters, include a number and special character.
                </p>
              )}
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              className="mt-1"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the{' '}
              <Link to="/terms" className="text-hotel-blue hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-hotel-blue hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap cursor-pointer"
          >
            <FaUserPlus size={18} className="mr-2" />
            Create Account
          </button>
        </form>

        {/* Already have account */}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-hotel-blue hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
