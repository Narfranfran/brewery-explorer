# Implementation Plan: Visualizacion Geospacial - Mapa Interactivo

## Fase 1: Preparación y Estructura de Componentes [checkpoint: ]

- [x] Task: Crear la estructura de directorios y archivos para los componentes del mapa (`app/components/Map/MapClient.jsx` y `app/components/Map/index.jsx`). [c4fa3dc]
- [ ] Task: Instalar las dependencias de Leaflet (`npm install leaflet react-leaflet leaflet-defaulticon-compatibility`).
- [ ] Task: Conductor - User Manual Verification 'Fase 1: Preparación y Estructura de Componentes' (Protocol in workflow.md)

## Fase 2: Desarrollo del Componente de Mapa (`MapClient`) [checkpoint: ]

- [ ] Task: Escribir tests (Rojos) para el componente `MapClient`.
    - [ ] Sub-task: Test para verificar que el componente renderiza un contenedor de mapa sin errores.
    - [ ] Sub-task: Test para verificar que se renderiza un `Marker` por cada elemento válido en la prop `breweries`.
    - [ ] Sub-task: Test para verificar que el `Popup` de un `Marker` muestra el nombre y tipo correctos de la cervecería.
- [ ] Task: Implementar la lógica del componente `MapClient.jsx` para pasar los tests (Verde).
    - [ ] Sub-task: Añadir `'use client';` al inicio del archivo.
    - [ ] Sub-task: Importar dependencias de `react-leaflet`, `leaflet` y `leaflet-defaulticon-compatibility` (incluyendo su CSS).
    - [ ] Sub-task: Crear la estructura del componente con `MapContainer` y `TileLayer`.
    - [ ] Sub-task: Implementar el mapeo de la prop `breweries` para generar los `Marker` y `Popup` correspondientes.
- [ ] Task: Refactorizar el código de `MapClient.jsx` y sus tests.
- [ ] Task: Conductor - User Manual Verification 'Fase 2: Desarrollo del Componente de Mapa (`MapClient`)' (Protocol in workflow.md)

## Fase 3: Implementación del Wrapper de Carga Dinámica [checkpoint: ]

- [ ] Task: Implementar el wrapper `app/components/Map/index.jsx`.
    - [ ] Sub-task: Usar `next/dynamic` para importar `MapClient` con `ssr: false`.
    - [ ] Sub-task: Añadir el estado de carga `loading` que devuelva `<p>Cargando mapa...</p>`.
- [ ] Task: Conductor - User Manual Verification 'Fase 3: Implementación del Wrapper de Carga Dinámica' (Protocol in workflow.md)

## Fase 4: Integración y Estilización Final [checkpoint: ]

- [ ] Task: Integrar el mapa en la página del dashboard (`app/dashboard/page.js`).
    - [ ] Sub-task: Importar el componente `Map` desde el wrapper (`app/components/Map`).
    - [ ] Sub-task: Pasar los datos del hook `useBreweries` al componente `<Map />`.
- [ ] Task: Aplicar los estilos necesarios con Tailwind CSS.
    - [ ] Sub-task: Asignar una altura fija al contenedor del mapa (ej. `h-96`).
    - [ ] Sub-task: Asignar un `z-index` bajo al mapa (ej. `z-0`) para compatibilidad con el `Navbar`.
- [ ] Task: Realizar pruebas manuales de la integración completa.
    - [ ] Sub-task: Verificar que el mapa se carga y muestra los marcadores correctamente.
    - [ ] Sub-task: Verificar que al usar los filtros del dashboard, los marcadores del mapa se actualizan.
    - [ ] Sub-task: Confirmar que no hay conflictos de estilo (z-index) con otros componentes de la UI.
- [ ] Task: Conductor - User Manual Verification 'Fase 4: Integración y Estilización Final' (Protocol in workflow.md)
