// app/page.js
import Link from 'next/link';

/**
 * Página de inicio de la aplicación.
 * Muestra una imagen de fondo temática y un mensaje de bienvenida con un enlace al dashboard.
 */
export default function HomePage() {
  return (
    // Contenedor principal que se expande para llenar el espacio y centrar su contenido.
    // La imagen de fondo se aplica directamente con la sintaxis de Tailwind CSS para evitar conflictos.
    <div 
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center bg-[url('/hero-background.png')]"
    >
      {/* Capa semitransparente sobre la imagen para oscurecerla ligeramente */}
      <div className="hero-overlay bg-opacity-60"></div>

      {/* Contenido del "hero" centrado */}
      <div className="hero-content text-center text-neutral-content">
        {/* Panel semitransparente para garantizar la legibilidad del texto */}
        <div className="max-w-md bg-black/60 backdrop-blur-md p-8 rounded-lg">
          <h1 className="mb-5 text-5xl font-bold">Bienvenido a Brewery Explorer</h1>
          <p className="mb-5">
            Tu guía definitiva para explorar cervecerías. Utiliza nuestro mapa interactivo y estadísticas para encontrar y descubrir tu próxima cerveza favorita.
          </p>
          <Link href="/dashboard" className="btn btn-primary">
            Empezar a Explorar
          </Link>
        </div>
      </div>
    </div>
  );
}