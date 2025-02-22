const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY; 

async function checkModelStatus() {
  try {
    const response = await axios.get(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1",
      { headers: { Authorization: `Bearer ${HF_API_KEY}` } }
    );

    console.log("Estado del modelo:", response.data);
  } catch (error) {
    console.error("Error verificando el modelo:", error.response.data);
  }
}

checkModelStatus();
