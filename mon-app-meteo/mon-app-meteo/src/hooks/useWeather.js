import { useState } from 'react';
import { getApiUrl } from '../config/config';

const useWeather = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [fullWeatherData, setFullWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    console.log(`Récupération météo pour: ${city}`);
    try {
      const response = await fetch(getApiUrl('weather', city));
      
      console.log('Statut réponse météo:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur API (${response.status}):`, errorText);
        throw new Error(`Erreur (${response.status}): ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Données météo reçues:', data);
      
      return data;
    } catch (error) {
      console.error('Erreur fetchWeather:', error);
      throw error;
    }
  };

  const fetchForecast = async (city) => {
    console.log(`Récupération prévisions pour: ${city}`);
    try {
      const response = await fetch(getApiUrl('forecast', city));
      
      console.log('Statut réponse prévisions:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erreur API (${response.status}):`, errorText);
        throw new Error(`Erreur (${response.status}): ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Données prévisions reçues:', data);
      
      return data;
    } catch (error) {
      console.error('Erreur fetchForecast:', error);
      throw error;
    }
  };

  const fetchCompleteWeather = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      // Récupération météo actuelle
      let weatherData = null;
      try {
        weatherData = await fetchWeather(city);
        console.log("Météo récupérée avec succès:", weatherData);
      } catch (weatherError) {
        console.error("Erreur météo:", weatherError);
      }
      
      // Récupération prévisions
      let forecastData = null;
      try {
        forecastData = await fetchForecast(city);
        console.log("Prévisions récupérées avec succès:", forecastData);
      } catch (forecastError) {
        console.error("Erreur prévisions:", forecastError);
      }
      
      // Création du format adapté même si l'une des données est manquante
      if (weatherData || forecastData) {
        // Créer les données actuelles avec les valeurs par défaut si nécessaire
        const currentData = weatherData || {
          temperature: 20,
          description: "Information temporaire",
          icon: "01d",
          humidity: 50,
          wind: 5,
          country: "FR",
          name: city
        };
        
        // Créer les données de prévision avec les valeurs par défaut si nécessaire
        const forecastFormattedData = forecastData || [
          {
            date: new Date().toISOString().split('T')[0],
            temperature: 20,
            description: "Prévision temporaire",
            icon: "01d"
          }
        ];
        
        // Assembler les données complètes
        const completeData = {
          current: currentData,
          forecast: forecastFormattedData
        };
        
        console.log("Données complètes assemblées:", completeData);
        
        // IMPORTANT: Mettre à jour les deux états de manière cohérente
        setWeather(currentData);  // weather = fullWeatherData.current
        setForecast(forecastFormattedData);
        setFullWeatherData(completeData);
      } else {
        throw new Error("Aucune donnée météo disponible");
      }
      
    } catch (error) {
      console.error('Erreur fetchCompleteWeather:', error);
      setError('Erreur lors de la réunion des données météo');
    } finally {
      setLoading(false);
    }
  };

  return {
    weather,
    forecast, 
    fullWeatherData,
    loading,
    error,
    fetchWeather,
    fetchForecast,
    fetchCompleteWeather
  };
};

export default useWeather;