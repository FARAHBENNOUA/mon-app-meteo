import React, { useState } from 'react';
import './WeatherTabs.css';

function WeatherTabs({ weatherData, city }) {
  // Ajoutez ce log pour voir les données reçues
  console.log("WeatherTabs reçoit:", weatherData, city);

  const [activeTab, setActiveTab] = useState('today');

  if (!weatherData || !weatherData.current || !weatherData.forecast) {
    console.error("Structure de données incorrecte:", weatherData);
    
    return <div className="loading">Chargement des données météo...</div>;
  }

  const current = weatherData.current;
  const forecast = weatherData.forecast;

  const renderTodayContent = () => (
    <div className="today-content">
      <div className="main-weather">
        <div className="temperature-display">
          <span className="large-temp">{Math.round(current.temperature)}°</span>
        </div>
        <div className="weather-condition">
          <img 
            src={`http://openweathermap.org/img/wn/${current.icon || '01d'}@2x.png`}
            alt={current.description || 'météo'} 
          />
          <span>{current.description || 'Information météo'}</span>
        </div>
        <div className="wind-info">
          <span className="wind-speed">{Math.round((current.wind || 0) * 3.6)} km/h</span>
        </div>
      </div>
      
      <div className="daily-periods">
        <div className="period active">
          <div className="period-name">MAINTENANT</div>
          <div className="period-time">{new Date().toLocaleTimeString('fr-FR', {hour: '2-digit', minute: '2-digit'})}</div>
        </div>
        <div className="period">
          <div className="period-name">APRÈS-MIDI</div>
          <div className="period-time">12:00-18:00</div>
        </div>
        <div className="period">
          <div className="period-name">SOIRÉE</div>
          <div className="period-time">18:00-00:00</div>
        </div>
        <div className="period">
          <div className="period-name">NUIT</div>
          <div className="period-time">00:00-06:00</div>
        </div>
      </div>

      <div className="day-summary">
        <h3>Résumé de la journée à {city}</h3>
        <div className="summary-details">
          <div className="summary-item">
            <span className="label">Température</span>
            <span className="value">{Math.round(current.temperature)}°C</span>
          </div>
          <div className="summary-item">
            <span className="label">Humidité</span>
            <span className="value">{current.humidity || 'N/A'}%</span>
          </div>
          <div className="summary-item">
            <span className="label">Vent</span>
            <span className="value">{Math.round((current.wind || 0) * 3.6)} km/h</span>
          </div>
          <div className="summary-item">
            <span className="label">Conditions</span>
            <span className="value">{current.description || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForecastContent = () => (
    <div className="forecast-content">
      <h3>Prévisions sur 5 jours</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-item">
            <div className="forecast-day">{new Date(day.date).toLocaleDateString('fr-FR', {weekday: 'short', day: 'numeric'})}</div>
            <img 
              src={`http://openweathermap.org/img/wn/${day.icon || '01d'}.png`}
              alt={day.description} 
            />
            <div className="forecast-temp">{Math.round(day.temperature)}°</div>
            <div className="forecast-desc">{day.description}</div>
            <div className="forecast-wind">{Math.round((day.wind || 0) * 3.6)} km/h</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="weather-tabs">
      <div className="tabs">
        <button 
          className={activeTab === 'today' ? 'active' : ''} 
          onClick={() => setActiveTab('today')}
        >
          Aujourd'hui
        </button>
        <button 
          className={activeTab === 'forecast' ? 'active' : ''} 
          onClick={() => setActiveTab('forecast')}
        >
          Prévisions 5 jours
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'today' ? renderTodayContent() : renderForecastContent()}
      </div>
    </div>
  );
}

export default WeatherTabs;