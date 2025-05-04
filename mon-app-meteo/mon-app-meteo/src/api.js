import axios from 'axios';
import config from './config/config';


const API = axios.create({
  baseURL: config.api.baseUrl
});

export const getWeather = async (city) => {
  try {
    const response = await API.get(config.api.endpoints.weather, { params: { city } });
    return response.data;
  } catch (error) {
    console.error('Erreur API météo:', error);
    throw error;
  }
};

// Authentification
export const loginUser = async (email, password) => {
  try {
    const response = await API.post(config.api.endpoints.auth.login, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erreur de connexion:', error);
    throw error;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await API.post(config.api.endpoints.auth.register, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await API.post(config.api.endpoints.auth.logout);
    return response.data;
  } catch (error) {
    console.error('Erreur de déconnexion:', error);
    throw error;
  }
};

// Favoris
export const getFavorites = async (token) => {
  try {
    const response = await API.get(config.api.endpoints.favorites.getAll, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur de récupération des favoris:', error);
    throw error;
  }
};

export const addFavorite = async (city, token) => {
  try {
    const response = await API.post(config.api.endpoints.favorites.add, { city }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur d\'ajout aux favoris:', error);
    throw error;
  }
};

export const removeFavorite = async (favoriteId, token) => {
  try {
    const response = await API.delete(config.api.endpoints.favorites.remove(favoriteId), {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur de suppression des favoris:', error);
    throw error;
  }
};

// Créer un objet avec toutes les fonctions
const apiService = {
  weather: {
    get: getWeather
  },
  auth: {
    login: loginUser,
    register: registerUser,
    logout: logoutUser
  },
  favorites: {
    getAll: getFavorites,
    add: addFavorite,
    remove: removeFavorite
  }
};

// Exporter l'objet
export default apiService;