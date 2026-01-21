# Spec: Visualizacion Geospacial - Mapa Interactivo

## 1. Visión General

Implementar un mapa interactivo en la aplicación utilizando `react-leaflet`. El mapa mostrará la ubicación de las cervecerías obtenidas a través del hook `useBreweries`. La implementación debe ser compatible con el entorno de Next.js (App Router), solucionando específicamente los problemas derivados del renderizado en el lado del servidor (SSR) mediante la carga dinámica de componentes de cliente.

## 2. Requisitos Funcionales

- **RF-01: Componente de Mapa Client-Side (`MapClient.jsx`)**
    - Debe ser un Componente de Cliente (`'use client'`).
    - Debe utilizar `MapContainer` y `TileLayer` de `react-leaflet`, usando el mapa base de OpenStreetMap.
    - Debe recibir una prop `breweries` (un array de objetos de cervecería).
    - Debe iterar sobre la prop `breweries` y renderizar un componente `<Marker>` por cada cervecería que tenga coordenadas (`latitude`, `longitude`) válidas.
    - Cada `<Marker>` debe contener un `<Popup>` que muestre el nombre y el tipo de la cervecería.

- **RF-02: Wrapper de Carga Dinámica (`Map/index.jsx`)**
    - Debe importar el componente `MapClient` utilizando `next/dynamic` para desactivar el SSR (`ssr: false`).
    - Debe mostrar un estado de carga textual, como `<p>Cargando mapa...</p>`, mientras el componente real del mapa se carga.
    - Este wrapper será el punto de entrada para importar el mapa en otras partes de la aplicación.

- **RF-03: Integración con Dashboard**
    - El mapa (a través de su wrapper dinámico) debe ser importado y utilizado en la página del dashboard (`app/dashboard/page.js`).
    - Los datos del hook `useBreweries` deben pasarse como prop al componente del mapa.
    - El mapa debe actualizarse en tiempo real cuando los datos del hook cambien como resultado de la aplicación de filtros (ej: por ciudad).

## 3. Requisitos No Funcionales

- **RNF-01: Estilos y Visualización**
    - El contenedor del mapa debe tener una altura fija (ej: `h-96`) para evitar que colapse a 0px.
    - El mapa debe tener un `z-index` inferior al de la barra de navegación (`z-0`) para evitar que se superponga a menús desplegables.

- **RNF-02: Dependencias y Compatibilidad**
    - Se deben instalar y configurar `leaflet`, `react-leaflet` y `leaflet-defaulticon-compatibility`.
    - Se debe importar el CSS de `leaflet` y `leaflet-defaulticon-compatibility` para asegurar que los iconos de los marcadores se muestren correctamente.

## 4. Criterios de Aceptación

- El mapa se renderiza en la página del dashboard sin errores de "window is not defined".
- Los marcadores de las cervecerías aparecen en sus ubicaciones geográficas correctas.
- Al hacer clic en un marcador, un popup se abre mostrando la información correcta.
- Los iconos de los marcadores son visibles y no están rotos.
- La funcionalidad de filtrado del dashboard actualiza los marcadores visibles en el mapa.
- El mapa no se superpone visualmente con el menú de navegación.

## 5. Fuera de Alcance

- Funcionalidades avanzadas de mapa como clustering de marcadores.
- Uso de proveedores de mapas personalizados o de pago.
- Geocodificación de direcciones (se asume que las coordenadas ya existen).
