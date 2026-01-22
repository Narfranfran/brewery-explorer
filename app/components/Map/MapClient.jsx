'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';
import { useEffect } from 'react';

/**
 * Componente interno para cambiar la vista del mapa de forma imperativa.
 * `MapContainer` de React-Leaflet no re-renderiza el centro del mapa si sus props cambian.
 * Este componente es un "workaround" estándar que usa el hook `useMap` (que solo
 * puede usarse en componentes hijos de `MapContainer`) para acceder a la instancia
 * del mapa y moverlo programáticamente.
 * @param {{ center: [number, number], zoom: number }} props
 */
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]); // Se ejecuta cada vez que el centro o el zoom cambian.
  return null; // No renderiza nada en el DOM.
};

/**
 * Componente Cliente que renderiza el mapa interactivo de Leaflet.
 * @param {{
 *   breweries: Array<Object>,
 *   center: [number, number] | null
 * }} props - `breweries` es la lista de marcadores a mostrar, `center` son las coordenadas para centrar el mapa.
 */
const MapClient = ({ breweries = [], center }) => {
  // Posición por defecto (centro de EEUU) que se usa cuando no se pasa un `center` específico.
  const defaultPosition = [39.8283, -98.5795];
  const initialZoom = 4; // Zoom para la vista general.
  const cityZoom = 12;   // Zoom más cercano para cuando se busca una ciudad.

  // Filtra las cervecerías para asegurar que tengan coordenadas válidas antes de intentar renderizarlas.
  const validBreweries = breweries
    .filter(brewery => brewery.latitude != null && brewery.longitude != null)
    .map(brewery => ({
      ...brewery,
      latitude: parseFloat(brewery.latitude),
      longitude: parseFloat(brewery.longitude),
    }));
  
  // Lógica para determinar el centro y zoom a aplicar.
  // Si la prop `center` tiene valor, se usa. Si es `null`, se usa la vista por defecto.
  const currentCenter = center || defaultPosition;
  const currentZoom = center ? cityZoom : initialZoom;

  return (
    <MapContainer center={currentCenter} zoom={currentZoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      {/* Se incluye el componente `ChangeView` para que el mapa responda a los cambios en `currentCenter` */}
      <ChangeView center={currentCenter} zoom={currentZoom} />
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Se itera sobre las cervecerías válidas para crear un marcador para cada una. */}
      {validBreweries.map((brewery) => (
        <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]}>
          <Popup>
            <div className="prose">
              <h3>{brewery.name}</h3>
              <div className="badge badge-primary badge-outline capitalize mb-4">{brewery.brewery_type}</div>
              
              <div className="text-sm">
                {brewery.address_1 && <p className="m-0">{brewery.address_1}</p>}
                <p className="m-0">{brewery.city}, {brewery.state_province} {brewery.postal_code}</p>
                
                {brewery.phone && (
                  <p className="mt-2 m-0">
                    📞 <a href={`tel:${brewery.phone}`} className="link">{brewery.phone}</a>
                  </p>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-2 mt-4">
                {brewery.website_url && (
                  <a 
                    href={brewery.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-ghost btn-xs"
                  >
                    Sitio Web
                  </a>
                )}
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${brewery.latitude},${brewery.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-xs"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapClient;
