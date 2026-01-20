'use client';

import { useState, useEffect, useCallback } from 'react';
import { getBreweries, getBreweryById } from '../services/breweryService';

/**
 * Hook personalizado para obtener datos de cervecerías de la API de Open Brewery DB.
 *
 * @param {object} initialParams - Parámetros iniciales para la carga de datos.
 * @returns {{...}}
 */
const useBreweries = (initialParams = {}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start loading initially
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);
  const [currentPage, setCurrentPage] = useState(initialParams.page || 1);
  const [totalPages, setTotalPages] = useState(1);

  const executeFetch = useCallback(async (fetchParams) => {
    setIsLoading(true);
    setError(null);
    try {
      let result;
      if (fetchParams.breweryId) {
        result = await getBreweryById(fetchParams.breweryId);
      } else {
        result = await getBreweries(fetchParams);
      }
      setData(result);
      setCurrentPage(fetchParams.page || 1);
      // Placeholder for total pages logic
      setTotalPages(prev => (result && result.length > 0 ? currentPage + 1 : prev));
    } catch (e) {
      setError(e);
      console.error("Error in useBreweries hook:", e);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]); // Dependency on currentPage might be needed for pagination logic

  // Initial fetch on mount
  useEffect(() => {
    executeFetch(params);
  }, [executeFetch, params]);

  // This function is returned to the component to trigger new fetches.
  const fetchBreweries = (newParams) => {
    const updatedParams = { ...params, ...newParams };
    setParams(updatedParams);
    // The fetch is now triggered by the change in `params` via useEffect
  };

  return {
    data,
    isLoading,
    error,
    currentPage,
    totalPages,
    fetchBreweries,
  };
};

export default useBreweries;
