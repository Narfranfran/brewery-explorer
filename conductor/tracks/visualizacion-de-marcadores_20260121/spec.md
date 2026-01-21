# Bugfix Specification: Visualizacion de Marcadores

## 1. Overview
The interactive map (`react-leaflet`) is failing to display markers for breweries. The root cause is suspected to be malformed or incomplete location data (latitude/longitude) being passed to the map component, preventing Leaflet from rendering the markers correctly.

## 2. Functional Requirements

### 2.1. Data Sanitization
- The `MapClient.jsx` component must filter the incoming `breweries` array.
- Only breweries that have both a valid `latitude` and a valid `longitude` (i.e., not `null` or `undefined`) shall be processed for rendering on the map.

### 2.2. Type Coercion
- When creating `<Marker>` components, the `latitude` and `longitude` values must be explicitly converted to floating-point numbers (e.g., using `parseFloat()`) to ensure they are in the correct format required by Leaflet.

### 2.3. Debug Logging
- A `console.log` statement will be temporarily added at the beginning of the `MapClient.jsx` component to log the raw `breweries` data received from the `useBreweries` hook. This is to facilitate debugging in the browser's developer console.

## 3. Non-Functional Requirements
- **Icon Compatibility:** The existing `leaflet-defaulticon-compatibility` import should be verified. If the issue persists after data sanitization, a fallback to a custom `L.icon` may be implemented to ensure icons are displayed.

## 4. Acceptance Criteria
- **AC1:** After the fix is implemented, brewery markers corresponding to breweries with valid coordinates must be visible on the interactive map on the dashboard page.
- **AC2:** The browser console should not show any errors related to Leaflet marker creation.

## 5. Out of Scope
- This fix will not address any issues unrelated to the rendering of map markers (e.g., data fetching errors, map tile loading issues, filtering logic).
