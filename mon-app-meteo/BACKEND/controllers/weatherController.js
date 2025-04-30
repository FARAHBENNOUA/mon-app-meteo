import fetch from "node-fetch";

const weatherController = {
  getCurrentWeather: async (req, res) => {
    try {
      const { city } = req.params;
      const API_KEY = process.env.OPENWEATHER_API_KEY;
      
      console.log(`Tentative de récupération météo pour: ${city}`);
      console.log(`Clé API utilisée: ${API_KEY ? API_KEY.substring(0, 5) + "..." : "NON DÉFINIE"}`);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      
      console.log(`Statut de la réponse: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Code d'erreur: ${response.status}`);
        console.error(`Réponse d'erreur: ${errorText}`);
        return res.status(response.status).json({ 
          error: `Erreur lors de la récupération des données météo: ${response.statusText}` 
        });
      }
      
      const data = await response.json();
      
      res.json({
        temperature: data.main.temp,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        icon: data.weather[0].icon
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo:", error);
      res.status(500).json({ error: "Erreur serveur lors de la récupération des données météo" });
    }
  },
  
  getForecast: async (req, res) => {
    try {
      const { city } = req.params;
      const API_KEY = process.env.OPENWEATHER_API_KEY;
      
      console.log(`Tentative de récupération des prévisions pour: ${city}`);
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fr`
      );
      
      console.log(`Statut de la réponse: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Code d'erreur: ${response.status}`);
        console.error(`Réponse d'erreur: ${errorText}`);
        return res.status(response.status).json({ 
          error: `Erreur lors de la récupération des prévisions: ${response.statusText}` 
        });
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
            icon: item.weather[0].icon
          });
        }
      });
      
      res.json(dailyForecasts);
    } catch (error) {
      console.error("Erreur lors de la récupération des prévisions:", error);
      res.status(500).json({ error: "Erreur serveur lors de la récupération des prévisions" });
    }
  }
};

export default weatherController;