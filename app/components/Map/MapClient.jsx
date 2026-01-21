'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

const MapClient = ({ breweries = [] }) => {
  const defaultPosition = [40.416775, -3.703790]; // Madrid, Spain coordinates

  // 2. Saneamiento y Conversión de Datos
  // Filtra cervecerías con coordenadas inválidas y convierte a números.
  const validBreweries = breweries
    .filter(brewery => brewery.latitude != null && brewery.longitude != null)
    .map(brewery => ({
      ...brewery,
      latitude: parseFloat(brewery.latitude),
      longitude: parseFloat(brewery.longitude),
    }));

  return (
    <MapContainer center={defaultPosition} zoom={6} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validBreweries.map((brewery) => (
        <Marker key={brewery.id} position={[brewery.latitude, brewery.longitude]}>
          <Popup>
            <div className="text-sm">
              <p className="font-bold text-base">{brewery.name}</p>
              <p className="capitalize italic text-gray-600">{brewery.brewery_type}</p>
              <hr className="my-2" />
              {brewery.address_1 && <p>{brewery.address_1}</p>}
              <p>{brewery.city}, {brewery.state_province} {brewery.postal_code}</p>
              {brewery.phone && <p className="mt-2">📞 {brewery.phone}</p>}
              {brewery.website_url && (
                <div className="mt-2">
                  <a 
                    href={brewery.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:underline"
                  >
                    Visitar sitio web
                  </a>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapClient;
