import React, { useState, useEffect } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WeatherTabs from './components/WeaterTabs';
import FavoriteButton from './components/FavoriteButton';
import FavoritesList from './components/FavoritesList';
import Login from './components/Login';
import Register from './components/Register';
import useWeather from './hooks/useWeather';
import config from './config/config';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [city, setCity] = useState(config.app.defaultCity);
  const { weather, fullWeatherData, loading, error, fetchCompleteWeather } = useWeather();

  useEffect(() => {
    if (city) {
      console.log("useEffect déclenché avec la ville:", city);
      fetchCompleteWeather(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  const handleSearch = (cityName) => {
    console.log("handleSearch appelé avec:", cityName);
    if (cityName && cityName !== city) {
      console.log(`Recherche de la météo pour: ${cityName}`);
      setCity(cityName);
    } else {
      console.log("Même ville ou nom de ville invalide:", cityName === city ? "même ville" : "nom invalide");
    }
  };

  // Helper function to get city name safely
  const getCityName = (data) => {
    // Check if the data has a name property
    if (data && data.name) return data.name;
    // Or if it has a city property
    if (data && data.city) return data.city;
    // Default to current city state
    return city;
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="map-background"></div>
        <div className="app">
          <header className="app-header">
            <Navbar 
              onLoginClick={() => setIsLoginOpen(true)} 
              onRegisterClick={() => setIsRegisterOpen(true)} 
            />
            <div className="current-location">
              {weather && (
                <div className="location-temp">
                  {getCityName(weather)} {weather.country === 'FR' ? `(${getCityName(weather).slice(0, 2)})` : ''} 
                  <span className="temp">{Math.round(weather.temperature)}°</span>
                </div>
              )}
              <button className="add-city-btn" onClick={() => setIsLoginOpen(true)}>
                Ajouter une ville +
              </button>
            </div>
          </header>
          
          <main className="container">
            <SearchBar onSearch={handleSearch} />
            
            {loading && <p className="loading">Chargement...</p>}
            
            {error && <p className="error">{error}</p>}
            
            {fullWeatherData && weather && (
              <>
                <div className="city-header">
                  <h1>METEO {getCityName(weather).toUpperCase()} ({weather.country === 'FR' ? getCityName(weather).substring(0, 2) : weather.country}) 
                  <i className="fas fa-star favorite-icon"></i></h1>
                </div>
                <WeatherTabs weatherData={fullWeatherData} city={getCityName(weather)} />
                <FavoriteButton city={getCityName(weather)} />
              </>
            )}
            
            <FavoritesList onSelectCity={handleSearch} />
          </main>

          {isLoginOpen && (
            <Login onClose={() => setIsLoginOpen(false)} />
          )}
          
          {isRegisterOpen && (
            <Register 
              onClose={() => setIsRegisterOpen(false)} 
              onSwitchToLogin={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
              }}
            />
          )}
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;