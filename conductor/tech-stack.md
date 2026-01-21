# Tech Stack: Brewery Explorer

This document outlines the core technologies and libraries used in the Brewery Explorer project.

## 1. Frontend
- **Framework:** Next.js (App Router)
  - Next.js provides the foundational framework for building the React application, offering features like routing, server-side rendering, and API routes.
- **Library:** React
  - Used for building the user interface with a component-based architecture.
- **Language:** JavaScript (ES6+)
  - The primary programming language for the entire application.
  - **HTTP Requests:** Utilizes the native `fetch` API for all communication with external APIs.
- **Styling:**
  - **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
  - **daisyUI:** A Tailwind CSS component library, providing pre-built UI components and themes for a "Fun & Curious" aesthetic.

## 2. Data Visualization & Mapping
- **Mapping Library:** `react-leaflet` (built on `Leaflet`)
  - Used for integrating interactive maps to display brewery locations. `react-leaflet` provides React components for `Leaflet` maps.
- **Charting Library:** `react-chartjs-2` (built on `Chart.js`)
  - Utilized for creating various statistical charts to visualize brewery data. `react-chartjs-2` offers React wrappers for `Chart.js`.

## 3. Deployment
- **Platform:** Vercel
  - The chosen platform for deploying the Next.js application, leveraging its optimized build and hosting capabilities.