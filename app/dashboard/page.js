'use client';

import useBreweries from '../hooks/useBreweries';
import Map from '../components/Map'; // Importar el componente Map

export default function DashboardPage() {
  const { breweries, isLoading, error } = useBreweries(); // Obtener 'breweries' del hook

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Dashboard - Verificación de Datos</h1>
      <p className="mt-4">
        A continuación se muestran los datos crudos obtenidos desde el hook `useBreweries` para
        verificar que la capa de datos funciona correctamente.
      </p>

      {/* Contenedor del mapa */}
      <div className="mt-6 h-96 z-0"> {/* Aplicar estilos para altura y z-index */}
        {isLoading && <p>Cargando mapa...</p>}
        {error && <p>Error al cargar el mapa: {error.message}</p>}
        {!isLoading && !error && <Map breweries={breweries} />} {/* Pasar las cervecerías al componente Map */}
      </div>

      <div className="mt-6">
        {isLoading && <p>Cargando datos...</p>}
        {error && <p>Error al cargar los datos: {error.message}</p>}
        {breweries && ( // Usar 'breweries' en lugar de 'data'
          <div>
            <h2 className="text-2xl font-semibold">Datos Recibidos:</h2>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-auto text-sm">
              {JSON.stringify(breweries, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

