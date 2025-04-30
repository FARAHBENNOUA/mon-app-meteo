const API_BASE_URL = "http://localhost:8888/api";

// Configuration de l'application
const APP_CONFIG = {
  name: "DOUNIA METEO",
  defaultCity: "Paris",
  units: "metric",
  lang: "fr"
};

// Créer l'objet de configuration
const config = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      weather: (city) => `/weather/${city}`,
      forecast: (city) => `/forecast/${city}`,
      auth: {
        login: "/auth/login",
        register: "/auth/register",
        logout: "/auth/logout"
      },
      favorites: {
        getAll: "/favorites",
        add: "/favorites",
        remove: (id) => `/favorites/${id}`
      }
    }
  },
  app: APP_CONFIG
};

// Fonction utilitaire pour construire les URLs d'API
const getApiUrl = (endpoint, param) => {
  switch(endpoint) {
    case 'weather':
      return `${API_BASE_URL}${config.api.endpoints.weather(param)}`;
    case 'forecast':
      return `${API_BASE_URL}${config.api.endpoints.forecast(param)}`;
    case 'login':
      return `${API_BASE_URL}${config.api.endpoints.auth.login}`;
    case 'register':
      return `${API_BASE_URL}${config.api.endpoints.auth.register}`;
    case 'logout':
      return `${API_BASE_URL}${config.api.endpoints.auth.logout}`;
    case 'favorites':
      return `${API_BASE_URL}${config.api.endpoints.favorites.getAll}`;
    case 'addFavorite':
      return `${API_BASE_URL}${config.api.endpoints.favorites.add}`;
    case 'removeFavorite':
      return `${API_BASE_URL}${config.api.endpoints.favorites.remove(param)}`;
    default:
      return '';
  }
};

// Exporter la configuration et la fonction utilitaire
export default config;
export { getApiUrl };