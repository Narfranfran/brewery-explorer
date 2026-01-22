/**
 * @file Fichero de servicio para interactuar con la API de Open Brewery DB.
 *
 * Centraliza todas las llamadas a la API en un solo lugar, facilitando el mantenimiento
 * y la reutilización del código.
 */

const API_BASE_URL = 'https://api.openbrewerydb.org/v1';

/**
 * Construye una URL de API completa a partir de un endpoint y un objeto de parámetros.
 * Ignora los parámetros con valores nulos o vacíos.
 * @param {string} endpoint - El endpoint de la API (ej. '/breweries').
 * @param {object} params - Objeto con los parámetros de consulta (ej. { by_city: 'san_diego' }).
 * @returns {string} La URL completa y lista para ser usada en una petición fetch.
 */
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    // Se asegura de que solo se añadan a la URL los parámetros con valor.
    if (params[key]) {
      url.searchParams.append(key, params[key]);
    }
  });
  return url.toString();
};

/**
 * Realiza una petición fetch a una URL y maneja la respuesta y los errores.
 * Es una función de utilidad interna para no repetir el mismo bloque try-catch.
 * @param {string} url - La URL a la que hacer la petición.
 * @returns {Promise<any>} Los datos de la respuesta en formato JSON.
 * @throws {Error} Si la respuesta de la red no es 'ok' (ej. status 404 o 500).
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
    // Re-lanza el error para que el código que llamó a esta función pueda manejarlo.
    throw error;
  }
};

/**
 * Obtiene una lista de cervecerías.
 * Puede recibir filtros y opciones de paginación.
 * @param {object} params - Objeto con los parámetros de consulta para la API.
 * @returns {Promise<any>} Una promesa que resuelve a un array de cervecerías.
 */
export const getBreweries = async (params) => {
  const url = buildUrl('/breweries', params);
  return fetchFromApi(url);
};

/**
 * Obtiene una cervecería específica por su ID.
 * @param {string} id - El ID de la cervecería a buscar.
 * @returns {Promise<any>} Una promesa que resuelve a un objeto de cervecería.
 */
export const getBreweryById = async (id) => {
  if (!id) {
    throw new Error("Se requiere un ID para obtener una cervecería.");
  }
  const url = buildUrl(`/breweries/${id}`);
  return fetchFromApi(url);
};
