'use client';

import { useState } from 'react';
import useBreweries from '../hooks/useBreweries';
import Map from '../components/Map';
import BreweryChart from '../components/Charts/BreweryChart';

/**
 * Página principal del Dashboard.
 * Orquesta los filtros, la carga de datos a través del hook `useBreweries`,
 * y la visualización del mapa y los gráficos.
 */
export default function DashboardPage() {
  // Se obtiene la funcionalidad del hook de cervecerías.
  // `fetchBreweries` es la función que usamos para pedirle al hook que cargue nuevos datos.
  const { breweries, isLoading, error, fetchBreweries } = useBreweries({ per_page: 50 });
  
  // --- ESTADOS DEL COMPONENTE ---
  // Almacena el valor del input de texto para la ciudad.
  const [city, setCity] = useState('');
  // Almacena el valor del desplegable para el tipo de cervecería.
  const [breweryType, setBreweryType] = useState('');
  // Almacena las coordenadas [lat, lon] para centrar el mapa. Null para la vista por defecto.
  const [mapCenter, setMapCenter] = useState(null);

  const breweryTypes = ["micro", "nano", "regional", "brewpub", "large", "planning", "bar", "contract", "proprietor"];

  /**
   * Obtiene las coordenadas geográficas para un nombre de ciudad.
   * Utiliza la API pública y gratuita de Nominatim (OpenStreetMap).
   * @param {string} cityName - El nombre de la ciudad.
   * @returns {Promise<[number, number]|null>} - Un array `[latitud, longitud]` o `null` si no se encuentra.
   */
  const getCoordsForCity = async (cityName) => {
    if (!cityName) return null;
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`);
      const data = await response.json();
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error("Error al geocodificar la ciudad:", error);
      return null;
    }
  };

  /**
   * Maneja el envío del formulario de filtros.
   * Construye los parámetros de búsqueda y actualiza tanto la lista de cervecerías como el centro del mapa.
   */
  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    const searchParams = { page: 1, per_page: 50 };
    if (city) {
      searchParams.by_city = city;
    }
    if (breweryType) {
      searchParams.by_type = breweryType;
    }

    // Pide al hook `useBreweries` que inicie una nueva búsqueda con los parámetros construidos.
    fetchBreweries(searchParams);

    // Si se especificó una ciudad, intenta obtener sus coordenadas para centrar el mapa.
    if (city) {
      const coords = await getCoordsForCity(city);
      if (coords) {
        setMapCenter(coords);
      }
    } else {
      // Si no hay ciudad, se reinicia el centro del mapa a la vista general.
      setMapCenter(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Explorador de Cervecerías</h1>
      
      {/* Sección de Filtros */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Filtros</h2>
          <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Filtrar por ciudad..."
              className="input input-bordered w-full max-w-xs"
            />
            <select
              value={breweryType}
              onChange={(e) => setBreweryType(e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="">Todos los tipos</option>
              {breweryTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
        </div>
      </div>

      {/* Sección del Mapa */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title mb-4">Mapa de Cervecerías</h2>
          <div className="h-96 md:h-[60vh] z-0 rounded-lg overflow-hidden">
            {isLoading && <div className="skeleton h-full w-full flex items-center justify-center"><p>Cargando mapa...</p></div>}
            {error && <p>Error al cargar el mapa: {error.message}</p>}
            <Map breweries={breweries} center={mapCenter} />
          </div>
        </div>
      </div>

      {/* Sección de Estadísticas */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">Estadísticas por Tipo</h2>
          <BreweryChart breweries={breweries} />
        </div>
      </div>
    </div>
  );
}

