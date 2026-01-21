# Implementation Plan: Bugfix - Visualizacion de Marcadores

## Phase 1: Test-Driven Development Setup

- [x] Task: Analyze existing tests for map components (e.g., `MapClient.test.js`) to understand the current testing patterns and mocking strategies.
- [x] Task: Write a new failing unit test for `MapClient.jsx`. This test should:
    - Provide a mock `breweries` array containing a mix of valid and invalid (null/undefined latitude/longitude) entries.
    - Assert that the component filters out the invalid entries before attempting to render markers.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Test-Driven Development Setup' (Protocol in workflow.md)

## Phase 2: Implementation & Correction

- [x] Task: Add a `console.log('Datos en Mapa:', breweries)` at the start of the `MapClient.jsx` component to allow for easy debugging of incoming data.
- [x] Task: Implement the data sanitization logic:
    - Create a `validBreweries` variable by filtering the `breweries` prop.
    - The filter should only include breweries where `latitude` and `longitude` are neither `null` nor `undefined`.
- [x] Task: Implement type coercion:
    - In the `.map()` function that renders the markers, wrap `brewery.latitude` and `brewery.longitude` with `parseFloat()`.
- [x] Task: Run the test suite and confirm that the failing test from Phase 1 now passes.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation & Correction' (Protocol in workflow.md)

## Phase 3: Verification & Cleanup

- [ ] Task: Manually verify in the browser that the brewery markers are now appearing correctly on the map.
- [ ] Task: Verify that the default Leaflet icons are loading. If not, investigate and implement a simple custom icon using `L.icon` as a fallback.
- [x] Task: Remove the temporary `console.log` statement added in Phase 2.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Verification & Cleanup' (Protocol in workflow.md)
