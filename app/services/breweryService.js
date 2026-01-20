// Fichero de servicio para interactuar con la API de Open Brewery DB

const API_BASE_URL = 'https://api.openbrewerydb.org/v1';

/**
 * Construye la URL final con los parámetros de consulta.
 * @param {string} endpoint - El endpoint de la API.
 * @param {object} params - Los parámetros de consulta.
 * @returns {string} La URL completa.
 */
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

/**
 * Realiza una petición a la API y maneja la respuesta.
 * @param {string} url - La URL a la que hacer la petición.
 * @returns {Promise<any>} Los datos de la respuesta.
 */
const fetchFromApi = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error de red: ${response.status} - ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al hacer fetch a la API:", error);
    throw error;
  }
};

/**
 * Obtiene una lista de cervecerías, con posibilidad de aplicar filtros y paginación.
 * @param {object} params - Objeto con los parámetros de consulta (filtros, paginación, etc.).
 * @returns {Promise<any>} Los datos de las cervecerías.
 */
export const getBreweries = async (params) => {
  const url = buildUrl('/breweries', params);
  return fetchFromApi(url);
};

/**
 * Obtiene una cervecería específica por su ID.
 * @param {string} id - El ID de la cervecería.
 * @returns {Promise<any>} Los datos de la cervecería.
 */
export const getBreweryById = async (id) => {
  if (!id) {
    throw new Error("Se requiere un ID para obtener una cervecería.");
  }
  const url = buildUrl(`/breweries/${id}`);
  return fetchFromApi(url);
};
