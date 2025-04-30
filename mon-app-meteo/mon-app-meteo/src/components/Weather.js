import React from 'react';

function Weather({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{weather.name}, {weather.sys.country}</h2>
      </div>
      
      <div className="weather-body">
        <div className="weather-icon">
          <img 
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
        
        <div className="weather-info">
          <div className="temperature">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="description">
            {weather.weather[0].description}
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div className="detail">
          <span>Ressenti</span>
          <span>{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="detail">
          <span>Humidité</span>
          <span>{weather.main.humidity}%</span>
        </div>
        <div className="detail">
          <span>Vent</span>
          <span>{Math.round(weather.wind.speed * 3.6)} km/h</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;