import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

import authRoutes from './routes/authRoutes.js';
import favoritesRoutes from './routes/favoritesRoutes.js';

// Chargement des variables d'environnement
dotenv.config();

// Vérification du chargement des variables
console.log("🔎 Variables d'environnement chargées :", process.env);

const app = express();
const PORT = process.env.PORT || 8888;
const API_KEY = process.env.OPENWEATHER_API_KEY;

// Vérification de la clé API
console.log("🔑 Clé API utilisée :", API_KEY);

const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";

// Configuration CORS pour permettre toutes les origines
app.use(cors({
  origin: '*',  // Autorise toutes les origines en développement
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

// Route météo actuelle - version améliorée
app.get('/api/weather/:city', async (req, res) => {
  try {
    const city = req.params.city;
    console.log(`🔍 Requête météo pour: ${city}`);

    const URL = `${WEATHER_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr`;
    console.log(`📡 URL météo: ${URL}`);

    const response = await fetch(URL);
    console.log(`🔄 Statut de la réponse météo: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Erreur API météo (${response.status}): ${errorText}`);
      return res.status(response.status).json({ error: "Impossible de récupérer les données météo" });
    }

    const data = await response.json();
    console.log(`📊 Données météo brutes reçues:`, JSON.stringify(data).substring(0, 200) + "...");

    // Vérification de la structure des données
    if (!data.main || !data.weather || !data.weather[0]) {
      console.error("❌ Structure de données météo inattendue:", data);
      return res.status(500).json({ error: "Format de données météo inattendu" });
    }

    const weatherData = {
      temperature: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
      country: data.sys.country,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      wind: data.wind.speed
    };

    console.log(`✅ Météo formatée:`, weatherData);
    res.json(weatherData);

  } catch (error) {
    console.error("❌ Exception dans route météo:", error);
    res.status(500).json({ error: "Impossible de récupérer les données météo" });
  }
});

// Route pour les prévisions
app.get('/api/forecast/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const timestamp = new Date().getTime(); // Évite la mise en cache

    console.log(`🔎 Requête prévisions pour : ${city}`);

    const URL = `${FORECAST_BASE_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=fr&ts=${timestamp}`;
    console.log("🔄 Requête prévisions envoyée :", URL);

    const response = await fetch(URL);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur API (${response.status}): ${errorText}`);
      return res.status(response.status).json({ error: "Impossible de récupérer les prévisions météo" });
    }

    const data = await response.json();
    
    // Traitement pour obtenir une prévision par jour
    const dailyForecasts = [];
    const processedDates = new Set();
    
    data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      
      if (!processedDates.has(date)) {
        processedDates.add(date);
        dailyForecasts.push({
          date,
          temperature: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity,
          wind: item.wind.speed
        });
      }
    });

    console.log(`🌍 Prévisions récupérées : ${dailyForecasts.length} jours`);
    res.json(dailyForecasts);

  } catch (error) {
    console.error("🚨 Erreur lors de la récupération des prévisions :", error);
    res.status(500).json({ error: "Impossible de récupérer les prévisions météo" });
  }
});

// Route de base
app.get('/', (req, res) => {
  res.send('✅ API DOUNIA METEO est opérationnelle !');
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});