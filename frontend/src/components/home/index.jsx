import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/Photo-article-16.jpg'; // Adjust the path accordingly
import Header from '../header';

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-xl rounded-lg max-w-lg">
          <h1 className="text-2xl font-semibold text-blue-600 mb-4">Access Denied</h1>
          <p className="text-lg text-gray-600">Please log in to view the home page.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      {/* Welcome Message */}
      <div className="text-center mb-12 p-12 bg-white bg-opacity-80 text-black rounded-xl shadow-xl max-w-2xl">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-700">
          Bienvenue, {currentUser.displayName ? currentUser.displayName : currentUser.email}
        </h1>
        <p className="text-lg font-medium text-blue-600">Explorez vos options ci-dessous.</p>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 max-w-6xl">
        {/* Espace Étudiant */}
        <div className="group relative transform transition-all duration-300 hover:scale-105">
          <div className="bg-white bg-opacity-85 text-black p-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600 group-hover:text-blue-800 transition duration-300">
              Espace Étudiant
            </h2>
            <p className="text-lg mb-6 text-gray-600">Déposez vos devoirs facilement et rapidement.</p>
            <button
              onClick={() => navigate('/etudiant', { state: { email: currentUser.email } })}
              className="py-3 px-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow-md hover:from-blue-500 hover:to-blue-400 transition duration-300"
            >
              Go to Student Space
            </button>
          </div>
        </div>

        {/* Espace Enseignant */}
        <div className="group relative transform transition-all duration-300 hover:scale-105">
          <div className="bg-white bg-opacity-85 text-black p-12 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
            <h2 className="text-3xl font-semibold mb-4 text-blue-600 group-hover:text-blue-800 transition duration-300">
              Espace Enseignant
            </h2>
            <p className="text-lg mb-6 text-gray-600">Récupérez les devoirs soumis par vos étudiants.</p>
            <button
              onClick={() => navigate('/enseignant', { state: { email: currentUser.email } })}
              className="py-3 px-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full shadow-md hover:from-blue-500 hover:to-blue-400 transition duration-300"
            >
              Go to Teacher Space
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
