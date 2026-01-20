# Plan de Implementación: Capa de Datos: Servicios y Hooks

## Fase 1: Setup y Estructura Inicial

- [x] Tarea: Crear archivo de servicio para la API de Open Brewery DB
    - [x] Crear `src/services/breweryService.js` (o similar)
- [x] Tarea: Crear archivo para el custom hook `useBreweries`
    - [x] Crear `src/hooks/useBreweries.js` (o similar)
- [ ] Tarea: Conductor - User Manual Verification 'Setup y Estructura Inicial' (Protocol in workflow.md)

## Fase 2: Implementación del Servicio de Cervecerías (`breweryService`)

- [ ] Tarea: Implementar función `getBreweries`
    - [ ] [Rojo] Escribir tests para `getBreweries`
    - [ ] [Verde] Implementar la lógica para `getBreweries` aceptando `params` (filtros, paginación, query)
    - [ ] Refactorizar y asegurar cobertura de tests
- [ ] Tarea: Implementar función `getBreweryById`
    - [ ] [Rojo] Escribir tests para `getBreweryById`
    - [ ] [Verde] Implementar la lógica para `getBreweryById`
    - [ ] Refactorizar y asegurar cobertura de tests
- [ ] Tarea: Implementar manejo de errores básico en el servicio
- [ ] Tarea: Conductor - User Manual Verification 'Implementación del Servicio de Cervecerías (breweryService)' (Protocol in workflow.md)

## Fase 3: Implementación del Custom Hook `useBreweries`

- [ ] Tarea: Inicializar el hook con estados de carga, error y datos
    - [ ] [Rojo] Escribir tests iniciales para `useBreweries`
    - [ ] [Verde] Implementar `useState` y `useEffect` para `isLoading`, `error` y `data`
    - [ ] Refactorizar y asegurar cobertura de tests
- [ ] Tarea: Implementar lógica de fetching condicional
    - [ ] [Rojo] Escribir tests para fetching por `breweryId`
    - [ ] [Verde] Implementar lógica para llamar a `breweryService.getBreweryById` si `breweryId` está presente
    - [ ] [Rojo] Escribir tests para fetching con `filters`, `page`, `per_page`, `query`
    - [ ] [Verde] Implementar lógica para llamar a `breweryService.getBreweries` con los parámetros adecuados
    - [ ] Refactorizar y asegurar cobertura de tests
- [ ] Tarea: Implementar función `fetchBreweries` para refetching
    - [ ] [Rojo] Escribir tests para `fetchBreweries`
    - [ ] [Verde] Implementar `fetchBreweries` y asegurar que actualiza el estado
    - [ ] Refactorizar y asegurar cobertura de tests
- [ ] Tarea: Implementar lógica de paginación (`currentPage`, `totalPages`)
    - [ ] [Rojo] Escribir tests para lógica de paginación
    - [ ] [Verde] Implementar cálculo y actualización de `currentPage` y `totalPages`
    - [ ] Refactorizar y asegurar cobertura de tests
- [ ] Tarea: Conductor - User Manual Verification 'Implementación del Custom Hook useBreweries' (Protocol in workflow.md)

## Fase 4: Verificación Visual

- [ ] Tarea: Integrar `useBreweries` en `app/dashboard/page.js`
    - [ ] Importar `useBreweries` en `app/dashboard/page.js`
    - [ ] Llamar al hook sin parámetros iniciales (para obtener todas las cervecerías por defecto)
- [ ] Tarea: Renderizar datos crudos en pantalla
    - [ ] Añadir `<pre>{JSON.stringify(data, null, 2)}</pre>` para mostrar el JSON de los datos.
    - [ ] Asegurar que el componente sea un "Client Component" si usa el hook.
- [ ] Tarea: Conductor - User Manual Verification 'Verificación Visual' (Protocol in workflow.md)
