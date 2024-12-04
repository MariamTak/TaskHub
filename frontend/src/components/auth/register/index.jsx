import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import articleImage from "../../../assets/Photo-article-16.jpg"; // Update the image path if necessary

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            if (password === confirmPassword) {
                await doCreateUserWithEmailAndPassword(email, password).catch((err) => {
                    setErrorMessage(err.message);
                    setIsRegistering(false);
                });
            } else {
                setErrorMessage("Passwords do not match!");
                setIsRegistering(false);
            }
        }
    };

    return (
        <>
            {userLoggedIn && <Navigate to={'/home'} replace={true} />}

            <div
                className="w-full h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${articleImage})` }}
            >
                {/* Form Container */}
                <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 text-gray-700">
                    <div className="text-center mb-6">
                        <h3 className="text-gray-800 text-2xl font-semibold sm:text-3xl">
                            Create a New Account
                        </h3>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
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
                                autoComplete="new-password"
                                required
                                disabled={isRegistering}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 px-4 py-3 rounded-xl shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                disabled={isRegistering}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full mt-2 px-4 py-3 rounded-xl shadow-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                        </div>

                        {errorMessage && (
                            <span className="text-red-500 font-medium text-sm">{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={`w-full px-4 py-3 text-white font-medium rounded-xl ${
                                isRegistering
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-transform transform hover:-translate-y-1'
                            }`}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>

                        <div className="text-sm text-center">
                            Already have an account?{' '}
                            <Link to={'/login'} className="text-indigo-600 hover:underline font-semibold">
                                Continue
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
