import { Link } from "react-router-dom";
import { RiMicAiLine } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-6 cursor-pointer"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500 text-white">
            <RiMicAiLine className="text-3xl" />
          </div>
          <h1 className="text-2xl font-semibold text-blue-600">Vocalify</h1>
        </Link>

        {/* 404 */}
        <h2 className="text-6xl font-bold text-blue-500">404</h2>

        <p className="mt-4 text-xl font-semibold text-gray-900">
          Page Not Found
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium transition cursor-pointer"
          >
            Back to Home
          </Link>

          <Link
            to="/auth/login"
            className="w-full border hover:bg-gray-50 py-2.5 rounded-lg font-medium transition cursor-pointer"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
