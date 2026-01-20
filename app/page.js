// app/page.js
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] p-8">
      <div className="hero bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Bienvenido a Brewery Explorer</h1>
            <p className="py-6">
              Tu guía definitiva para explorar cervecerías. Busca, encuentra y descubre tu próxima cerveza favorita.
            </p>
            <a href="/dashboard" className="btn btn-primary">
              Ir al Dashboard
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}