import { useState } from "react";
import { Link } from "react-router-dom";
import { RiMicAiLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSignIn, useUser } from "@clerk/clerk-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoaded, setActive, signIn } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/sso-callback",
      });
    } catch (error) {
      console.log("An error occurred", error);
      toast.error("Login failed");
      setGoogleLoading(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    if (!isLoaded) {
      setLoading(false);
      return;
    }

    try {
      const signinResult = await signIn.create({
        identifier: email,
        password: password,
      });

      if (signinResult.status === "complete") {
        await setActive({ session: signinResult.createdSessionId });
        // Navigate to dashboard or home instead of sso-callback for regular sign-in
        navigate("/dashboard"); // or wherever you want users to go after sign-in
      } else {
        toast.error("Sign-in incomplete. Please check your credentials.");
        setError("Sign-in failed. Please check your credentials.");
      }

      setLoading(false);
    } catch (error) {
      toast.error("Failed to sign in. Please try again.");
      setError("Failed to sign in. Please try again.");
      console.error("Sign-in error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
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
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mt-1">
          Sign in to continue to Vocalify.
        </p>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => {
            handleGoogleSignIn();
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

        <form className="space-y-4" onSubmit={() => handleSignIn}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(email.target.value);
            }}
            className="w-full rounded-lg border px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full rounded-lg border px-4 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
