'use client';

import { useState } from 'react';
import useBreweries from '../hooks/useBreweries';
import Map from '../components/Map';
import BreweryChart from '../components/Charts/BreweryChart';

export default function DashboardPage() {
  const { breweries, isLoading, error, fetchBreweries } = useBreweries({ per_page: 50 });
  const [city, setCity] = useState('');

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchBreweries({ by_city: city, page: 1 });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Explorador de Cervecerías</h1>
      
      {/* Formulario de Filtro en una Card */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <h2 className="card-title">Filtros</h2>
          <form onSubmit={handleFilterSubmit} className="flex flex-col md:flex-row gap-2 items-start md:items-center">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Filtrar por ciudad..."
              className="input input-bordered w-full max-w-xs"
            />
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Buscando...' : 'Buscar'}
            </button>
          </form>
        </div>
      </div>

      {/* Contenedor Principal (Grid) para Mapa y Gráfico */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Columna del Mapa */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Mapa de Cervecerías</h2>
            <div className="h-96 z-0 rounded-lg overflow-hidden">
              {isLoading && <div className="skeleton h-full w-full flex items-center justify-center"><p>Cargando mapa...</p></div>}
              {error && <p>Error al cargar el mapa: {error.message}</p>}
              {!isLoading && !error && <Map breweries={breweries} />}
            </div>
          </div>
        </div>

        {/* Columna de Estadísticas */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Estadísticas por Tipo</h2>
            <BreweryChart breweries={breweries} />
          </div>
        </div>

      </div>
    </div>
  );
}

