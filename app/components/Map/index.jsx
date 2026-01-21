import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>,
});

const Map = (props) => {
  return <MapClient {...props} />;
};

export default Map;
