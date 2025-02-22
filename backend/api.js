const express = require("express");
const axios = require("axios");
require("dotenv").config();

const MODEL_URL = "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct";
const app = express();
const port = 3000;

const HF_API_KEY = process.env.HF_API_KEY;

app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Falta la pregunta en la solicitud." });
  }

  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: question },
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    res.json({ answer: response.data[0].generated_text });
  } catch (error) {
    if (error.response) {
      console.error("Error en Hugging Face:", error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error("Error desconocido:", error.message);
      res.status(500).json({ error: "Error en el servidor." });
    }
  }
});

app.listen(port, () => {
  console.log(`Servidor API corriendo en http://localhost:${port}`);
});
