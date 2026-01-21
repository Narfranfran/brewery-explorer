# Implementation Plan: Visualizacion Geospacial - Mapa Interactivo

## Fase 1: Preparación y Estructura de Componentes [checkpoint: f89ecb6]

- [x] Task: Crear la estructura de directorios y archivos para los componentes del mapa (`app/components/Map/MapClient.jsx` y `app/components/Map/index.jsx`). [c4fa3dc]
- [x] Task: Instalar las dependencias de Leaflet (`npm install leaflet react-leaflet leaflet-defaulticon-compatibility`). [487cfc6]
- [x] Task: Conductor - User Manual Verification 'Fase 1: Preparación y Estructura de Componentes' (Protocol in workflow.md) [checkpoint: 8711add]

## Fase 2: Desarrollo del Componente de Mapa (MapClient) [checkpoint: 982f134]

- [x] Task: Escribir tests (Rojos) para el componente MapClient. [e47e33a]
    - [x] Sub-task: Test para verificar que el componente renderiza un contenedor de mapa sin errores.
    - [x] Sub-task: Test para verificar que se renderiza un Marker por cada elemento válido en la prop breweries.
    - [x] Sub-task: Test para verificar que el Popup de un Marker muestra el nombre y tipo correctos de la cervecería.
- [x] Task: Implementar la lógica del componente MapClient.jsx para pasar los tests (Verde). [e47e33a]
    - [x] Sub-task: Añadir 'use client'; al inicio del archivo.
    - [x] Sub-task: Importar dependencias de react-leaflet, leaflet y leaflet-defaulticon-compatibility (incluyendo su CSS).
    - [x] Sub-task: Crear la estructura del componente con MapContainer y TileLayer.
    - [x] Sub-task: Implementar el mapeo de la prop breweries para generar los Marker y Popup correspondientes.
- [x] Task: Refactorizar el código de MapClient.jsx y sus tests. [e47e33a]
- [~] Task: Conductor - User Manual Verification 'Fase 2: Desarrollo del Componente de Mapa (MapClient)' (Protocol in workflow.md)

## Fase 3: Implementación del Wrapper de Carga Dinámica [checkpoint: aa64e20]

- [x] Task: Implementar el wrapper `app/components/Map/index.jsx`. [e553b5b]
    - [x] Sub-task: Usar next/dynamic para importar MapClient con ssr: false.
    - [x] Sub-task: Añadir el estado de carga loading que devuelva <p>Cargando mapa...</p>.
- [~] Task: Conductor - User Manual Verification 'Fase 3: Implementación del Wrapper de Carga Dinámica' (Protocol in workflow.md)

## Fase 4: Integración y Estilización Final [checkpoint: ]

- [x] Task: Integrar el mapa en la página del dashboard (`app/dashboard/page.js`). [e9b3c89]
    - [x] Sub-task: Importar el componente Map desde el wrapper (`app/components/Map`).
    - [x] Sub-task: Pasar los datos del hook useBreweries al componente `<Map />`.
- [x] Task: Aplicar los estilos necesarios con Tailwind CSS. [CANCELLED: Estilos aplicados en tarea anterior]
    - [x] Sub-task: Asignar una altura fija al contenedor del mapa (ej. `h-96`). [CANCELLED]
    - [x] Sub-task: Asignar un `z-index` bajo al mapa (ej. `z-0`) para compatibilidad con el `Navbar`. [CANCELLED]
- [x] Task: Realizar pruebas manuales de la integración completa. [c36ff5f]
    - [x] Sub-task: Verificar que el mapa se carga y muestra los marcadores correctamente.
    - [x] Sub-task: Verificar que al usar los filtros del dashboard, los marcadores del mapa se actualizan.
    - [x] Sub-task: Confirmar que no hay conflictos de estilo (z-index) con otros componentes de la UI.
- [ ] Task: Conductor - User Manual Verification 'Fase 4: Integración y Estilización Final' (Protocol in workflow.md)
