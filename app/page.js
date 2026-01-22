// app/page.js
import Link from 'next/link';

/**
 * Página de inicio de la aplicación.
 * Muestra una imagen de fondo temática y un mensaje de bienvenida con un enlace al dashboard.
 */
export default function HomePage() {
  const imageUrl = "https://images.unsplash.com/photo-1587883971690-de8b3d687364?auto=format&fit=crop&w=1920&q=80";

  return (
    // Contenedor principal que se expande para llenar el espacio y centrar su contenido.
    <div 
      className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url("${imageUrl}")` }}
    >
      {/* Capa semitransparente sobre la imagen para mejorar la legibilidad del texto */}
      <div className="hero-overlay bg-opacity-70"></div>

      {/* Contenido del "hero" centrado */}
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
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