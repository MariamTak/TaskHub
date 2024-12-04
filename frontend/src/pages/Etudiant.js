import React from 'react';
import { useLocation } from 'react-router-dom';
import backgroundImage from '../assets/Photo-article-16.jpg'; // Import your background image
import Header from '../components/header';
import axios from 'axios';

const Etudiant = () => {
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nom: event.target.nom.value,
      prenom: event.target.prenom.value,
      file: event.target.file.files[0],
    };

    try {
      const file = formData.file;
      const fileContent = await toBase64(file); // Convert file to base64
      const fileName = `${Date.now()}-${file.name}`;
      const fileType = file.type;

      const requestData = {
        nom: formData.nom,
        prenom: formData.prenom,
        email,
        fileName,
        fileType,
        fileContent,
      };

      const response = await axios.post("http://localhost:5000/upload", requestData);

      if (response.status === 200) {
        alert("Fichier et métadonnées enregistrés avec succès !");
        handleSendEmail();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Une erreur est survenue.");
    }
  };

  const handleSendEmail = async () => {
    const emailData = {
      to: email,
      subject: "Confirmation de soumission",
      text: "Votre devoir a été soumis avec succès.",
      html: "<h1>Votre devoir a été soumis avec succès.</h1>",
    };

    try {
      await axios.post("http://localhost:5000/send-email", emailData);
      alert("E-mail envoyé !");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Une erreur est survenue.");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]); // Extract base64 part
      reader.onerror = (error) => reject(error);
    });

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">Déposer un devoir</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="file"
            name="file"
            className="mb-4 p-3 border border-gray-300 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="mt-4 py-3 px-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md w-full hover:from-blue-600 hover:to-indigo-700 transition duration-300"
          >
            Soumettre
          </button>
        </form>
      </div>
    </div>
  );
};

export default Etudiant;
