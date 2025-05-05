import { Link } from 'react-router-dom';
import { CiHome } from 'react-icons/ci';

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 text-center px-4">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
      <Link
        to="/"
        className=" flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-6 py-2 rounded-md whitespace-nowrap cursor-pointer"
      >
        <CiHome className="text-xl" /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
