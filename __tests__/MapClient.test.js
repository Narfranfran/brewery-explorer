import { render, screen } from '@testing-library/react';
import MapClient from '../app/components/Map/MapClient';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(({ children }) => <div data-testid="MapContainer">{children}</div>),
  TileLayer: jest.fn(() => <div data-testid="TileLayer" />),
  Marker: jest.fn(({ children }) => <div data-testid="Marker">{children}</div>),
  Popup: jest.fn(({ children }) => <div data-testid="Popup">{children}</div>),
}));

describe('MapClient', () => {
  it('should render a MapContainer and TileLayer', () => {
    render(<MapClient />);
    expect(screen.getByTestId('MapContainer')).toBeInTheDocument();
    expect(screen.getByTestId('TileLayer')).toBeInTheDocument();
  });

  it('should render a Marker for each brewery with valid coordinates', () => {
    const mockBreweries = [
      { id: '1', name: 'Brewery A', latitude: '10', longitude: '20' },
      { id: '2', name: 'Brewery B', latitude: '30', longitude: '40', brewery_type: 'micro' },
      { id: '3', name: 'Brewery C', latitude: null, longitude: '50' }, // Invalid coordinates
    ];

    render(<MapClient breweries={mockBreweries} />);

    // Expect two markers to be rendered (Brewery A and Brewery B)
    const markers = screen.getAllByTestId('Marker');
    expect(markers).toHaveLength(2);

    // Verify content of the first marker's popup
    expect(markers[0]).toHaveTextContent('Brewery A');
    expect(markers[0]).not.toHaveTextContent('micro'); // No brewery_type for Brewery A

    // Verify content of the second marker's popup
    expect(markers[1]).toHaveTextContent('Brewery B');
    expect(markers[1]).toHaveTextContent('micro');
  });

  it('should not render Markers if no breweries are provided', () => {
    render(<MapClient breweries={[]} />);
    expect(screen.queryAllByTestId('Marker')).toHaveLength(0);
  });

  it('should not render Markers if breweries prop is undefined', () => {
    render(<MapClient />);
    expect(screen.queryAllByTestId('Marker')).toHaveLength(0);
  });
});