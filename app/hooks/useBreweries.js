'use client';

import { useState, useEffect, useCallback } from 'react';
import { getBreweries, getBreweryById } from '../services/breweryService';

/**
 * Hook personalizado para gestionar carga de datos de cervecerías desde la API.
 * Abstrae toda la lógica de estado (carga, error, datos) y la comunicación con el servicio.
 *
 * @param {object} initialParams - Parámetros iniciales para la primera carga de datos al montar el componente.
 * @returns {{
 *   breweries: Array|null,
 *   isLoading: boolean,
 *   error: Error|null,
 *   fetchBreweries: (newParams: object) => void
 * }} - Objeto con los datos y funciones para interactuar con el hook.
 */
const useBreweries = (initialParams = {}) => {
  // --- ESTADOS ---
  // Almacena la lista de cervecerías recibida de la API.
  const [breweries, setBreweries] = useState(null);
  // Controla si hay una petición de datos en curso. Útil para mostrar spinners.
  const [isLoading, setIsLoading] = useState(true);
  // Almacena cualquier error que ocurra durante la petición.
  const [error, setError] = useState(null);
  // Almacena los parámetros de la búsqueda actual (ciudad, tipo, etc.).
  const [params, setParams] = useState(initialParams);

  /**
   * Función que ejecuta la petición a la API.
   * Se envuelve en `useCallback` para memorizarla y evitar que se recree en cada render,
   * optimizando el rendimiento. Solo se recrearía si sus dependencias (el array vacío `[]`) cambiaran,
   * lo que significa que se crea una sola vez.
   */
  const executeFetch = useCallback(async (fetchParams) => {
    setIsLoading(true); // Indica que la carga ha comenzado.
    setError(null);     // Limpia errores anteriores.
    setBreweries([]);   // Limpia los resultados anteriores para una mejor experiencia de usuario.

    try {
      // Llama al servicio correspondiente para obtener los datos.
      const result = await getBreweries(fetchParams);
      setBreweries(result); // Actualiza el estado con los nuevos datos.
    } catch (e) {
      // Si ocurre un error en la petición, se almacena en el estado.
      setError(e);
      console.error("Error en el hook useBreweries:", e);
    } finally {
      // Se ejecuta siempre al final, tanto si hay éxito como si hay error.
      setIsLoading(false); // Indica que la carga ha terminado.
    }
  }, []);

  // --- EFECTOS ---
  /**
   * Este `useEffect` es el motor reactivo del hook.
   * Se ejecuta automáticamente cuando el componente se monta por primera vez
   * y, crucialmente, cada vez que el estado `params` cambia.
   *
   * Flujo:
   * 1. Un componente llama a `fetchBreweries(nuevosParams)`.
   * 2. `fetchBreweries` actualiza el estado `params`.
   * 3. El cambio en `params` dispara este `useEffect`.
   * 4. Este efecto llama a `executeFetch` para realizar la nueva búsqueda con los nuevos parámetros.
   */
  useEffect(() => {
    executeFetch(params);
  }, [executeFetch, params]); // Dependencias: se re-ejecuta si `executeFetch` o `params` cambian.

  // --- FUNCIÓN PÚBLICA ---
  /**
   * Función que los componentes usarán para solicitar una nueva carga de datos con diferentes filtros.
   * Su única responsabilidad es actualizar el estado `params`.
   * @param {object} newParams - Nuevos parámetros de búsqueda para combinar con los existentes.
   */
  const fetchBreweries = (newParams) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams); // Actualizar el estado de los parámetros dispara el `useEffect`.
  };

  // El hook devuelve los estados y la función para que los componentes puedan usarlos.
  return {
    breweries,
    isLoading,
    error,
    fetchBreweries,
  };
};

export default useBreweries;
