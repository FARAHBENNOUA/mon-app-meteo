import fetch from "node-fetch";

// Utilisation de la variable d'environnement
const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

async function getWeather(city) {
  console.log(`Tentative de récupération météo pour: ${city}`);
  console.log(`3038f758914f5c5aefccb5320af2cd0e:' ${API_KEY ? API_KEY.substring(0, 5) + "..." : "NON DÉFINIE"}`);
  
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    console.log(`Statut de la réponse: ${response.status}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Code d'erreur: ${response.status}`);
      console.error(`Réponse d'erreur: ${errorText}`);
      throw new Error(`Erreur API: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
      country: data.sys.country,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données météo:", error);
    return null;
  }
}

export default getWeather;
