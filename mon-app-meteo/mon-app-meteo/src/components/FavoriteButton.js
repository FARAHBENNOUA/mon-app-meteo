import React from 'react';
import { useAuthContext } from '../contexts/AuthContext';

function FavoriteButton({ city }) {
  const { currentUser, addFavorite, removeFavorite, isFavorite, favorites } = useAuthContext();
  
  const isInFavorites = isFavorite(city);

  const handleToggleFavorite = () => {
    if (!currentUser) {
      alert("Vous devez être connecté pour ajouter des favoris");
      return;
    }
    
    if (isInFavorites) {
      const favorite = favorites.find(f => f.city.toLowerCase() === city.toLowerCase());
      if (favorite) {
        removeFavorite(favorite.id);
      }
    } else {
      addFavorite(city);
    }
  };

  if (!currentUser) return null;

  return (
    <button
      className={`favorite-button ${isInFavorites ? 'active' : ''}`}
      onClick={handleToggleFavorite}
    >
      {isInFavorites ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
    </button>
  );
}

export default FavoriteButton;