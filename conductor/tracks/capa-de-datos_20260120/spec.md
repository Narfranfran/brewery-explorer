# Especificación: Capa de Datos: Servicios y Hooks

## 1. Visión General

Esta especificación describe la implementación de la capa de datos para la aplicación "Brewery Explorer", centrándose en la creación de un custom hook (`useBreweries`) y un servicio dedicado para interactuar con la API de Open Brewery DB. El objetivo es proporcionar una manera flexible y reutilizable de consumir los datos de las cervecerías, separando la lógica de negocio de la de presentación.

## 2. Requisitos Funcionales

### 2.1 Custom Hook: `useBreweries`

*   **Propósito:** Proporcionar una interfaz reactiva para la carga de datos de cervecerías, encapsulando la lógica de fetching, estados de carga y errores.
*   **Flexibilidad:** El hook debe ser capaz de manejar los siguientes escenarios de fetching:
    *   Cargar una lista de todas las cervecerías.
    *   Cargar una cervecería específica por su ID.
    *   Cargar cervecerías basadas en parámetros de filtrado (ej. ciudad, tipo).
    *   Realizar búsquedas de texto libre.
*   **Parámetros de Entrada:** El hook debe aceptar los siguientes parámetros para controlar la consulta:
    *   `breweryId`: Opcional. String, para buscar una única cervecería por su identificador.
    *   `filters`: Opcional. Objeto que contiene pares clave-valor para aplicar filtros (ej. `{ by_city: 'San Diego', by_type: 'micro' }`).
    *   `page`: Opcional. Número, para la paginación de resultados.
    *   `per_page`: Opcional. Número, para definir la cantidad de resultados por página.
    *   `query`: Opcional. String, para búsquedas de texto libre.
*   **Valores de Retorno:** El hook debe exponer la siguiente información:
    *   `data`: Los datos de las cervecerías fetched (puede ser un array de cervecerías o una única cervecería).
    *   `isLoading`: Booleano que indica si la petición de datos está en curso.
    *   `error`: Objeto de error en caso de que la petición falle.
    *   `currentPage`: Número que indica la página actual de los resultados (útil para paginación).
    *   `totalPages`: Número que indica el total de páginas disponibles (útil para paginación).
    *   `fetchBreweries`: Función para re-ejecutar la lógica de fetching o cargar más datos, potencialmente con nuevos parámetros.

### 2.2 Servicio de API: `breweryService.js` (o similar)

*   **Propósito:** Centralizar las llamadas directas a la API de Open Brewery DB, desacoplando la lógica de fetching del custom hook.
*   **Funcionalidades:** Debe exponer funciones para:
    *   `getBreweries(params)`: Realiza una llamada a la API para obtener cervecerías, aceptando un objeto `params` que puede incluir filtros, paginación y query.
    *   `getBreweryById(id)`: Realiza una llamada a la API para obtener una cervecería específica por su ID.
*   **Implementación:** Utilizar `fetch` o una librería HTTP como `axios` para las llamadas a la API.

## 3. Requisitos No Funcionales

*   **Rendimiento:** Las llamadas a la API deben ser eficientes. Se considerará la implementación de estrategias de caching si fuera necesario para mejorar la experiencia de usuario.
*   **Mantenibilidad:** El código debe ser modular, fácil de entender y mantener.
*   **Errores:** Manejo robusto de errores de red y de la API.

## 4. Criterios de Aceptación

*   El custom hook `useBreweries` se puede importar y utilizar en componentes React.
*   El hook es capaz de cargar cervecerías por ID, por filtros, por búsqueda y obtener todas las cervecerías.
*   El hook expone correctamente los estados de `isLoading`, `error`, `data`, `currentPage`, `totalPages` y la función `fetchBreweries`.
*   Las llamadas a la API se gestionan a través de un servicio `breweryService.js` o similar.
*   La aplicación no realiza llamadas directas a la API desde los componentes React, salvo a través del hook `useBreweries`.
*   El código está documentado en español, explicando la lógica de los `useEffect` y otros puntos complejos.

## 5. Fuera de Alcance

*   Implementación de UI para filtros, búsqueda o paginación (esto será abordado en tracks separados).
*   Gestión de estado global para los datos de las cervecerías más allá del hook (`redux`, `zustand`, etc., salvo que se considere una extensión del hook o del servicio).
