import express from "express";
import cors from "cors";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post("/requestWeather", async (req, res) => {
  try {
    const { city, temperature, humidity, condition } = req.body;
    const id = uuidv4(); // Generate UUID in the backend
    console.log(id,city,humidity,condition);
    const axiosResponse = await axios.post(
      "https://dt0zi3ga6e.execute-api.us-east-2.amazonaws.com/default/weather_lambda",
      { id, city, temperature, humidity, condition }, // Send UUID to Lambda
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Lambda Response:", axiosResponse.data);
    res.json(axiosResponse.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
