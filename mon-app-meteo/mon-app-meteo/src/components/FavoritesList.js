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

  return (
    <div className="favorites-list">
      <h3>Villes suggérées</h3>
      <ul>
        {allCities.map((city, index) => (
          <li key={city.id || `city-${index}`}>
            <span 
              className="favorite-item" 
              onClick={() => onSelectCity(city.city)}
            >
              {city.city}
            </span>
            {city.isFavorite && (
              <button 
                className="remove-button"
                onClick={() => city.id && removeFavorite(city.id)}
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