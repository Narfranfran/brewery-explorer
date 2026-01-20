# GEMINI.MD: Contexto del Proyecto "Brewery Explorer"

## 1. Resumen del Proyecto (Ámbito Académico DWEC)
Este es un proyecto grupal para la asignatura **"Desarrollo Web en Entorno Cliente"**.  
**Objetivo:** Crear una aplicación Next.js que consuma la API pública **"Open Brewery DB"** para mostrar cervecerías de forma *"curiosa"* (mapas interactivos + estadísticas).  
**Repositorio:** GitHub (Colaborativo).  
**Despliegue:** Vercel.

---

## 2. Reglas de la Asignatura (ESTRICTAS)
El código generado **DEBE** cumplir con los siguientes requisitos pedagógicos:

### Custom Hooks
La lógica de carga de datos debe extraerse a un hook personalizado (ej: `useBreweries`).  
No hacer fetch directamente en el componente si se puede evitar.

### Filtrado
Debe existir un formulario visible que permita filtrar los datos (ej: por ciudad o tipo de cervecería) y que actualice el hook.

### Estructura de Layouts
- **app/layout.js:** Layout principal con Header y Footer.
- **app/dashboard/layout.js:** Layout anidado (requisito 1.2 del PDF) que incluya una navegación secundaria o migas de pan (Breadcrumbs).

### Visualización
- Usar **react-leaflet** para mapas.  
  *(IMPORTANTE: Usar dynamic import con `ssr: false` para evitar error "window is not defined").*
- Usar **react-chartjs-2** para mostrar estadísticas (ej: Tipos de cervecerías por estado).

---

## 3. Stack Tecnológico
- **Framework:** Next.js 14/15 (App Router).
- **Estilos:** Tailwind CSS + daisyUI (usar componentes como card, navbar, hero, steps).
- **Lenguaje:** JavaScript (ES6+). Preferir functional components.

---

## 4. Guía de Estilo y Comentarios
- **Idioma:** Todos los comentarios y documentación del código deben estar en **ESPAÑOL**.
- **Explicación:** Comentar partes complejas (especialmente los `useEffect` y la lógica de los hooks) para demostrar comprensión al profesor.

### Cliente vs Servidor
- Usar `'use client';` explícitamente en componentes que usen hooks (`useState`, `useEffect`) o librerías de UI interactivas (Mapas/Gráficos).
- Mantener las páginas (`page.js`) como Server Components siempre que sea posible, pasando datos a componentes cliente.

---

## 5. Flujo de Trabajo con Conductor
Antes de implementar una funcionalidad grande, genera un plan en `conductor/plan.md`.

Verifica siempre que las librerías externas (Leaflet/Chart.js) no rompan el build de producción en Vercel.
