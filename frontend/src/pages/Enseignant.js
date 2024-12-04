import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/Photo-article-16.jpg'; // Importation de l'image de fond
import Header from '../components/header';

const Enseignant = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        // Requête à l'API backend pour récupérer les données
        const response = await axios.get("http://localhost:5000/submissions"); 
        setSubmissions(response.data); // Stocker les données récupérées
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des soumissions :", err);
        setError("Une erreur est survenue lors de la récupération des données.");
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Définir l'image de fond
      }}
    >
      <Header />
      <div className="bg-white bg-opacity-100 p-8 rounded-xl shadow-2xl w-full max-w-4xl">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Liste des Devoirs</h1>
        {submissions.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-6">Nom</th>
                <th className="py-3 px-6">Prénom</th>
                <th className="py-3 px-6">Date de Soumission</th>
                <th className="py-3 px-6">Fichier</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr key={submission.email} className="border-b">
                  <td className="py-4 px-6">{submission.nom}</td>
                  <td className="py-4 px-6">{submission.prenom}</td>
                  <td className="py-4 px-6">{new Date(submission.dateSoumission).toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <a
                      href={submission.fichier}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Télécharger
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-700">Aucune soumission trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Enseignant;
