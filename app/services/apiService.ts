import axios, { AxiosInstance } from 'axios';
import { router } from 'expo-router';
import Constants from 'expo-constants';
import tokenStorage from './tokenStorage';
import logger from './logger';


// Configuration de base d'axios
const baseURL = (Constants?.expoConfig as any)?.extra?.apiUrl || process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8888';

export const API: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000, // Increase timeout to 30 seconds for testing
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  //withCredentials: true
});

// Fonction pour définir le token - modified to only use AsyncStorage
const setAuthToken = async (token: string) => {
  if (token) {
    // Store token securely and cache
    await tokenStorage.setAccessToken(token);

    // Also set in default headers for immediate requests
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    logger.debug('Token défini');
  } else {
    // Remove token from storage
    await tokenStorage.clearAccessToken();
    delete API.defaults.headers.common['Authorization'];
    logger.debug('Token supprimé');
  }
};

// Important: Ne pas lire le storage au chargement module (SSR/web) –
// initialiser dans l'app au montage via _layout / context.

// Intercepteur pour ajouter le token d'authentification à chaque requête
API.interceptors.request.use(
  async (config: any) => {
    // Use in-memory cached token to avoid async storage hit every time
    if (config && config.headers && !config.headers.Authorization) {
      const token = tokenStorage.getAccessTokenSync() || await tokenStorage.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    logger.error("Erreur dans l'intercepteur de requête:", error);
    return Promise.reject(error);
  }
);

let isRedirectingToLogin = false;

// Add response interceptor for error handling
API.interceptors.response.use(
  response => response,
  async error => {
    logger.warn('API Error:', error.message);

    // Vérifier si l'erreur est due à un token invalide (401 Unauthorized)
    if (error.response && error.response.status === 401 && !isRedirectingToLogin) {
      logger.info('Token invalide - Redirection vers la page de connexion');
      isRedirectingToLogin = true;

      // Supprimer le token
      await tokenStorage.clearAccessToken();
      delete API.defaults.headers.common['Authorization'];

      // Rediriger vers la page de connexion en utilisant expo-router
      router.replace('/login');

      // Réinitialiser le drapeau de redirection après un court délai
      setTimeout(() => {
        isRedirectingToLogin = false;
      }, 2000);
    }

    if (error.response) {
      logger.debug('Status:', error.response.status);
      logger.debug('Data:', error.response.data);
    } else if (error.request) {
      logger.debug('No response received');
    }

    return Promise.reject(error);
  }
);

// API pour les volontaires
const volontairesApi = {
  // Récupérer tous les volontaires
  getAll: () => {
    return API.get('/api/volontaires');
  },

  // Récupérer un volontaire par ID
  getById: (id: string | number) => {
    return API.get(`/api/volontaires/${id}`);
  },

  // Récupérer les détails d'un volontaire (backend: /api/volontaires/details/{id})
  getDetailsById: (id: string | number) => {
    return API.get(`/api/volontaires/details/${id}`);
  },

  // Créer un nouveau volontaire
  create: (volontaireData: any) => {
    return API.post('/api/volontaires', volontaireData);
  },

  // Créer les détails d'un volontaire
  createDetails: (detailsData: any) => {
    return API.post('/api/volontaires/details', detailsData);
  },

  // Mettre à jour un volontaire
  update: (id: string | number, volontaireData: any) => {
    return API.put(`/api/volontaires/${id}`, volontaireData);
  },

  // Mettre à jour les détails d'un volontaire (backend: /api/volontaires/details/{id})
  updateDetails: (id: string | number, detailsData: any) => {
    return API.put(`/api/volontaires/details/${id}`, detailsData);
  },

  // Supprimer un volontaire
  delete: (id: string | number) => {
    return API.delete(`/api/volontaires/${id}`);
  }
};

// API pour les habitudes cosmétiques
const habituesCosmetiquesApi = {
  // Récupérer toutes les habitudes cosmétiques
  getAll: () => {
    return API.get('/api/volontaires-hc');
  },

  // Récupérer les habitudes cosmétiques d'un volontaire
  getByVolontaireId: (id: string | number) => {
    return API.get(`/api/volontaires-hc/volontaire/${id}`);
  },

  create: (hcData: any) => {
    // Créer une copie des données pour éviter de les modifier directement
    const data = { ...hcData };

    // S'assurer que l'ID est envoyé comme un nombre
    if (data.idVol && typeof data.idVol === 'string') {
      data.idVol = parseInt(data.idVol, 10);
    }

    // Convertir toutes les valeurs booléennes selon différentes possibilités
    Object.keys(data).forEach(key => {
      if (key !== 'idVol' && typeof data[key] === 'boolean') {
        // Essayons avec "oui"/"non" en minuscules
        data[key] = data[key] ? 'oui' : 'non';
      }
    });

    return API.post('/api/volontaires-hc', data);
  },

  // Mettre à jour les produits d'un volontaire
  updateProduits: (idVol: string | number, produitsData: any) => {
    return API.patch(`/api/volontaires-hc/volontaire/${idVol}/produits`, produitsData);
  },

  // Mettre à jour un produit d'un volontaire
  updateProduit: (idVol: string | number, produitData: any) => {
    return API.patch(`/api/volontaires-hc/volontaire/${idVol}/produit`, produitData);
  },

  // Supprimer les habitudes cosmétiques d'un volontaire
  delete: (idVol: string | number) => {
    return API.delete(`/api/volontaires-hc/volontaire/${idVol}`);
  }
};

// Add a connection test function
const testConnection = async () => {
  try {
    logger.info('Testing API connection...');
    const response = await axios.get(`${baseURL}/api/health`, {
      timeout: 5000
    });
    logger.info('Connection successful');
    return true;
  } catch (error) {
    if (error instanceof Error) {
      logger.error('Connection test failed:', error.message);
    } else {
      logger.error('Connection test failed:', error as any);
    }
    if (typeof error === 'object' && error !== null && 'response' in error) {
      // Type assertion to access error.response safely
      const err = error as { response: any };
      logger.debug('Response received with error status:', err.response.status);
    } else if (typeof error === 'object' && error !== null && 'request' in error) {
      const err = error as { request: any };
      logger.debug('No response received from server');
    }
    return false;
  }
};

// Exportez vos API
export default {
  volontaires: volontairesApi,
  habituesCosmetiques: habituesCosmetiquesApi,
  setAuthToken, // Exporter la fonction setAuthToken
  testConnection, // Export the test function

  // Méthode pour gérer la connexion
  login: async (login: string, password: string) => {
    try {
      logger.info(`Tentative de connexion avec: ${login}`);
      const response = await API.post('/api/auth/login', {
        login: login,
        motDePasse: password
      });

      // Si la réponse contient un token, le stocker
      if (response.data && response.data.token) {
        await setAuthToken(response.data.token);
      }
      return response;
    } catch (error) {
      logger.error('Erreur de connexion:', error);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        logger.debug('Réponse d\'erreur:', (error as any).response.data);
      } else if (typeof error === 'object' && error !== null && 'request' in error) {
        logger.debug('Aucune réponse reçue');
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        logger.debug('Erreur de configuration:', (error as any).message);
      } else {
        logger.debug('Erreur inconnue:', error as any);
      }
      throw error;
    }
  },

  // Méthode pour la déconnexion
  logout: async () => {
    try {
      await API.post('/api/auth/logout');
      // Supprimer le token
      await tokenStorage.clearAccessToken();
      delete API.defaults.headers.common['Authorization'];
      return true;
    } catch (error) {
      logger.error('Erreur lors de la déconnexion:', error);
      return false;
    }
  },

  // Méthode pour tester le token
  validateToken: async () => {
    try {
      const response = await API.get('/api/auth/validate');
      return { valid: true, message: response.data };
    } catch (error) {
      let message = '';
      if (typeof error === 'object' && error !== null) {
        if ('response' in error && (error as any).response?.data) {
          message = (error as any).response.data;
        } else if ('message' in error) {
          message = (error as any).message;
        } else {
          message = 'Une erreur inconnue est survenue.';
        }
      } else {
        message = String(error);
      }
      return { valid: false, message };
    }
  }
};
