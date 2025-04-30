import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config/config';

// URL de base de l'API
const API_URL = config.api.baseUrl;

export function useAuth() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Utiliser useCallback pour mémoriser la fonction fetchFavorites
  const fetchFavorites = useCallback(async () => {
    if (!token) return [];
    
    try {
      const response = await axios.get(`${API_URL}/favorites`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(response.data);
      return response.data;
    } catch (err) {
      console.error("Erreur lors de la récupération des favoris:", err);
      setError("Impossible de charger les favoris");
      return [];
    }
  }, [token]); // token est une dépendance

  useEffect(() => {
    // Vérifier si un token existe et récupérer les données utilisateur
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCurrentUser(response.data);
          fetchFavorites();
        } catch (err) {
          // Si le token est invalide, le supprimer
          localStorage.removeItem('authToken');
          setToken(null);
          setCurrentUser(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [token, fetchFavorites]); // Ajout de fetchFavorites comme dépendance

  // Reste du code inchangé...
  
  const signup = async (email, password) => {
    // ...
  };

  const login = async (email, password) => {
    // ...
  };

  const logout = async () => {
    // ...
  };

  const addFavorite = async (cityName) => {
    // ...
  };

  const removeFavorite = async (favoriteId) => {
    // ...
  };

  const isFavorite = (cityName) => {
    // ...
  };

  return {
    currentUser,
    loading,
    error,
    favorites,
    signup,
    login,
    logout,
    addFavorite,
    removeFavorite,
    isFavorite
  };
}

export default useAuth; 