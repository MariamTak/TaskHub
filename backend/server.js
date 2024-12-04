require("dotenv").config(); // Charger les variables d'environnement
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { s3, dynamoDB } = require("./awsConfig");
const sendgrid = require("./sendgridConfig");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Route pour récupérer les soumissions (DynamoDB)
app.get("/submissions", async (req, res) => {
  const params = {
    TableName: "Submissions",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    res.status(200).json(data.Items);
  } catch (error) {
    console.error("Erreur lors de la récupération des soumissions :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des soumissions", error });
  }
});

// Route pour uploader un fichier (AWS S3 et DynamoDB)
app.post("/upload", async (req, res) => {
  const { nom, prenom, email, fileName, fileType, fileContent } = req.body;

  try {
    // Upload to S3
    const s3Params = {
      Bucket: "taskhub-submissions",
      Key: fileName,
      Body: Buffer.from(fileContent, "base64"), // Convertir base64 en binaire
      ContentType: fileType,
    };
    const s3Response = await s3.upload(s3Params).promise();

    // Sauvegarder les métadonnées dans DynamoDB
    const dynamoParams = {
      TableName: "Submissions",
      Item: {
        email,
        nom,
        prenom,
        dateSoumission: new Date().toISOString(),
        fichier: s3Response.Location,
      },
    };
    await dynamoDB.put(dynamoParams).promise();

    res.status(200).json({ message: "Upload réussi", fileUrl: s3Response.Location });
  } catch (error) {
    console.error("Erreur lors de l'upload :", error);
    res.status(500).json({ message: "Erreur lors de l'upload", error });
  }
});

// Route pour envoyer un email (SendGrid)
app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  const msg = {
    to,
    from: "amadiane450@gmail.com", // Adresse de l'expéditeur
    subject,
    text,
    html,
  };

  try {
    await sendgrid.send(msg);
    res.status(200).json({ message: "E-mail envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error);
    res.status(500).json({ message: "Échec de l'envoi de l'e-mail.", error });
  }
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
