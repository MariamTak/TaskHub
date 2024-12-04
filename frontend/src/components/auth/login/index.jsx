import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "../../../firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import articleImage from "../../../assets/Photo-article-16.jpg"; // Update path as per your structure

const Login = () => {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithEmailAndPassword(email, password).catch((err) => {
        setIsSigningIn(false);
        setErrorMessage(err.message);
      });
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div>
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}

      <div
        className="w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${articleImage})` }}
      >
        {/* Semi-Transparent Form Overlay */}
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 text-gray-700">
          <p className="text-center text-4xl font-extrabold text-indigo-600">Sign In</p>
          <p className="text-center text-sm text-gray-500">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-4 py-3 rounded-xl shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center font-medium">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-3 text-white font-medium rounded-xl ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-transform transform hover:-translate-y-1"
              }`}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-indigo-600 hover:underline font-semibold">
              Sign up
            </Link>
          </p>

          <div className="flex items-center text-center w-full my-4">
            <div className="border-b-2 w-full"></div>
            <p className="px-4 text-sm font-medium text-gray-500">OR</p>
            <div className="border-b-2 w-full"></div>
          </div>

          <button
            disabled={isSigningIn}
            onClick={onGoogleSignIn}
            className={`w-full flex items-center justify-center gap-x-3 py-3 border rounded-xl font-medium ${
              isSigningIn
                ? "cursor-not-allowed"
                : "hover:bg-gray-50 hover:shadow-md transition-all active:scale-95"
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_17_40)">
                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
              </g>
              <defs>
                <clipPath id="clip0_17_40">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>
            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
