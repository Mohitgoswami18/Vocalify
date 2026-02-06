import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMicAiLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignUp, useUser } from "@clerk/clerk-react";
import {toast} from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoaded, setActive, signUp } = useSignUp();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false)
  const [loading, setLoading] = useState(false) 
  const [code, setCode] = useState("");
  const [error, setError] = useState(false)
  const { user } = useUser(); 
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    await signUp.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/sso-callback",
    });
    setGoogleLoading(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      toast.success(
        "Sign up successful! Please check your email for verification code.",
      );
      setPendingVerification(true);
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      setError("Failed to sign up. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isLoaded) return;

    try {
      const signupCompleted = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signupCompleted.status === "complete") {
        await setActive({ session: signupCompleted.createdSessionId });
        const username = user?.username || user?.id;
        navigate(`/${username}/dashboard`);
      } else {
        toast.error("Verification failed. Please try again.");
        setError("Invalid code. Please try again.");
        console.log("Verification failed:", signupCompleted);
      }
    } catch (error) {
      toast.error("Failed to verify email. Please try again.");
      setError("Failed to verify email. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md cursor-pointer bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Clickable Logo → Home */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-6 cursor-pointer"
        >
          <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-500 text-white">
            <RiMicAiLine className="text-3xl" />
          </div>
          <h1 className="text-2xl font-semibold text-blue-600">Vocalify</h1>
        </Link>
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign up to get started with Vocalify.
        </p>
        {/* Google Signup */}
        <button
          type="button"
          onClick={() => {
            handleGoogleSignUp();
          }}
          className="mt-6 w-full flex items-center justify-center gap-3 border rounded-lg py-2.5 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
        >
          {googleLoading ? (
            <Spinner></Spinner>
          ) : (
            <p className="flex items-center justify-center gap-2">
              {" "}
              <FcGoogle className="text-2xl" />
              continue with Google
            </p>
          )}
        </button>
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>
        {!pendingVerification ? (
          <form className="space-y-4" onSubmit={(e) => handleSignUp(e)}>
            <input
              type="text"
              placeholder="Full name"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-medium cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleEmailVerification}>
            {/* Verification Code */}
            <div className="mt-2 my-8 flex items-center justify-center">
              <label
                htmlFor="code"
                className="block w-1/2 text-md font-medium text-gray-700 dark:text-gray-300"
              >
                Code
              </label>
              <input
                type="text"
                id="code"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-md rounded-lg border border-gray-300 bg-white dark:bg-zinc-900 dark:border-gray-700 px-4 py-1 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                className="w-full h-8 flex items-center justify-center cursor-pointer text-md rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 transition"
                type="submit"
              >
                {!loading ? "Verify" : <Loader />}
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="w-full h-8 cursor-pointer flex items-center justify-center text-md rounded-lg bg-gray-600 px-4 py-2 font-semibold text-white hover:bg-gray-700 transition"
                onClick={() => setPendingVerification(false)}
              >
                Try Again
              </button>
            </div>
          </form>
        )}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
