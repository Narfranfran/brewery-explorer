# Plan de Implementación: Capa de Datos: Servicios y Hooks

## Fase 1: Setup y Estructura Inicial

- [x] Tarea: Crear archivo de servicio para la API de Open Brewery DB
    - [x] Crear `src/services/breweryService.js` (o similar)
- [x] Tarea: Crear archivo para el custom hook `useBreweries`
    - [x] Crear `src/hooks/useBreweries.js` (o similar)
- [x] Tarea: Conductor - User Manual Verification 'Setup y Estructura Inicial' (Protocol in workflow.md) [3ea016b]

## Fase 2: Implementación del Servicio de Cervecerías (`breweryService`)

- [x] Tarea: Implementar función `getBreweries`
    - [x] [Rojo] Escribir tests para `getBreweries`
    - [x] [Verde] Implementar la lógica para `getBreweries` aceptando `params` (filtros, paginación, query)
    - [x] Refactorizar y asegurar cobertura de tests
- [x] Tarea: Implementar función `getBreweryById`
    - [x] [Rojo] Escribir tests para `getBreweryById`
    - [x] [Verde] Implementar la lógica para `getBreweryById`
    - [x] Refactorizar y asegurar cobertura de tests
- [x] Tarea: Implementar manejo de errores básico en el servicio
- [x] Tarea: Conductor - User Manual Verification 'Implementación del Servicio de Cervecerías (`breweryService`)' (Protocol in workflow.md) [3ea016b]

## Fase 3: Implementación del Custom Hook `useBreweries`

- [x] Tarea: Inicializar el hook con estados de carga, error y datos
    - [x] [Rojo] Escribir tests iniciales para `useBreweries`
    - [x] [Verde] Implementar `useState` y `useEffect` para `isLoading`, `error` y `data`
    - [x] Refactorizar y asegurar cobertura de tests
- [x] Tarea: Implementar lógica de fetching condicional
    - [x] [Rojo] Escribir tests para fetching por `breweryId`
    - [x] [Verde] Implementar lógica para llamar a `breweryService.getBreweryById` si `breweryId` está presente
    - [x] [Rojo] Escribir tests para fetching con `filters`, `page`, `per_page`, `query`
    - [x] [Verde] Implementar lógica para llamar a `breweryService.getBreweries` con los parámetros adecuados
    - [x] Refactorizar y asegurar cobertura de tests
- [x] Tarea: Implementar función `fetchBreweries` para refetching
    - [x] [Rojo] Escribir tests para `fetchBreweries`
    - [x] [Verde] Implementar `fetchBreweries` y asegurar que actualiza el estado
    - [x] Refactorizar y asegurar cobertura de tests
- [x] Tarea: Implementar lógica de paginación (`currentPage`, `totalPages`)
    - [x] [Rojo] Escribir tests para lógica de paginación
    - [x] [Verde] Implementar cálculo y actualización de `currentPage` y `totalPages`
    - [x] Refactorizar y asegurar cobertura de tests
- [x] Tarea: Conductor - User Manual Verification 'Implementación del Custom Hook useBreweries' (Protocol in workflow.md) [3ea016b]

## Fase 4: Verificación Visual

- [x] Tarea: Integrar `useBreweries` en `app/dashboard/page.js`
    - [x] Importar `useBreweries` en `app/dashboard/page.js`
    - [x] Llamar al hook sin parámetros iniciales (para obtener todas las cervecerías por defecto)
- [x] Tarea: Renderizar datos crudos en pantalla
    - [x] Añadir `<pre>{JSON.stringify(data, null, 2)}</pre>` para mostrar el JSON de los datos.
    - [x] Asegurar que el componente sea un "Client Component" si usa el hook.
- [x] Tarea: Conductor - User Manual Verification 'Verificación Visual' (Protocol in workflow.md)
