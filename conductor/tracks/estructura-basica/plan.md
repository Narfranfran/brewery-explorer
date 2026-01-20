# Track: Estructura Básica y Navegación

**Objective:** Establish the fundamental project structure, including layouts, routing, and a basic navigation header, according to the DWEC course requirements.

## Implementation Steps

1.  **Install Dependencies:**
    *   Install `daisyui` as a dev dependency (`npm install -D daisyui@latest`).
    *   Configure `tailwind.config.js` to include the daisyUI plugin and the selected theme (e.g., "cupcake").

2.  **Create Dashboard Structure:**
    *   Create the `app/dashboard/` directory.
    *   Create `app/dashboard/page.js` as a placeholder page for the main dashboard.

3.  **Implement Root Layout (`app/layout.js`):**
    *   Modify the main layout to include a `<header>` and `<footer>`.
    *   Create a `components/` directory at the root level.
    *   Create a `components/layout/Header.js` component.
    *   Implement a responsive navigation bar inside `Header.js` using daisyUI's `navbar` component. It should contain the application title "Brewery Explorer".
    *   Create a `components/layout/Footer.js` component and add some basic information (e.g., "Project for DWEC").
    *   Import and use `Header` and `Footer` in `app/layout.js`.

4.  **Implement Nested Dashboard Layout (`app/dashboard/layout.js`):**
    *   Create the file `app/dashboard/layout.js`.
    *   As per the requirements, this layout must be nested within the root layout.
    *   Add a secondary navigation element, like breadcrumbs or a sub-menu, to comply with requirement 1.2 of the PDF mentioned in `GEMINI.md`. For now, a placeholder "Breadcrumbs" text will suffice.

5.  **Verification:**
    *   Run the development server (`npm run dev`).
    *   Verify that the main page and the `/dashboard` page render correctly.
    *   Check that the Header and Footer appear on both routes.
    *   Confirm the nested layout on `/dashboard` shows the additional navigation element.
    *   Ensure there are no console errors.
