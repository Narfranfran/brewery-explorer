'use client';

import useBreweries from '../hooks/useBreweries';

export default function DashboardPage() {
  const { data, isLoading, error } = useBreweries();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Dashboard - Verificación de Datos</h1>
      <p className="mt-4">
        A continuación se muestran los datos crudos obtenidos desde el hook `useBreweries` para
        verificar que la capa de datos funciona correctamente.
      </p>

      <div className="mt-6">
        {isLoading && <p>Cargando datos...</p>}
        {error && <p>Error al cargar los datos: {error.message}</p>}
        {data && (
          <div>
            <h2 className="text-2xl font-semibold">Datos Recibidos:</h2>
            <pre className="bg-gray-100 p-4 rounded-md mt-2 overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
