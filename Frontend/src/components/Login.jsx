import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500 text-white">
            🎤
          </div>
          <h1 className="text-2xl font-semibold text-blue-600">Vocalify</h1>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign in to continue to Vocalify.
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                👁
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <button type="button" className="text-blue-500 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* CAPTCHA (UI only) */}
          <div className="flex items-center gap-3 border rounded-lg p-3">
            <input type="checkbox" />
            <span className="text-sm text-gray-600">I'm not a robot</span>
            <div className="ml-auto h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-xs">
              img
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>

      {/* Bottom legal */}
      <div className="absolute bottom-4 text-center text-xs text-gray-400 hidden sm:block">
        <p>Privacy Policy | Terms of Service</p>
        <p>© 2026 Vocalify. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;