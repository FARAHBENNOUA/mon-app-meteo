import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

function FavoritesList({ onSelectCity }) {
  const { favorites, removeFavorite } = useAuthContext();

  // Villes par défaut à afficher
  const defaultCities = [
    { city: "Paris", region: "Europe" },
    { city: "Algiers", region: "Afrique" },
    { city: "Marseille", region: "Europe" },
    { city: "Beijing", region: "Asie" },
    { city: "New York", region: "Amérique" },
    { city: "Anchorage", region: "Amérique" }
  ];

  // Si l'utilisateur n'est pas connecté, afficher quand même les villes par défaut
  const allCities = [...defaultCities];
  
  // Ajouter les villes des favoris qui ne sont pas déjà dans la liste par défaut
  if (favorites && favorites.length > 0) {
    favorites.forEach(fav => {
      if (!allCities.some(city => city.city.toLowerCase() === fav.city.toLowerCase())) {
        allCities.push({ city: fav.city, id: fav.id, region: "Favoris" });
      } else {
        // Marquer les villes qui sont dans les favoris
        const cityIndex = allCities.findIndex(c => c.city.toLowerCase() === fav.city.toLowerCase());
        if (cityIndex !== -1) {
          allCities[cityIndex].id = fav.id;
          allCities[cityIndex].isFavorite = true;
        }
      }
    });
  }

  // Fonction de gestion du clic avec logs
  const handleCityClick = (cityName) => {
    console.log("Clic sur la ville:", cityName);
    
    // Vérifier que onSelectCity est bien une fonction
    if (typeof onSelectCity === 'function') {
      onSelectCity(cityName);
      console.log("Fonction onSelectCity appelée avec:", cityName);
    } else {
      console.error("onSelectCity n'est pas une fonction:", onSelectCity);
    }
  };

  return (
    <div className="favorites-list">
      <h3>Villes suggérées</h3>
      <ul>
        {allCities.map((city, index) => (
          <li key={city.id || `city-${index}`}>
            <span 
              className="favorite-item" 
              onClick={() => handleCityClick(city.city)}
              style={{ cursor: 'pointer' }} // Assure que le curseur change au survol
            >
              {city.city}
            </span>
            {city.isFavorite && (
              <button 
                className="remove-button"
                onClick={() => {
                  console.log("Suppression du favori:", city.id);
                  city.id && removeFavorite(city.id);
                }}
              >
                ✕
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesList;