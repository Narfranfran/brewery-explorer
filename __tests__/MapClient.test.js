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
  beforeEach(() => {
    // Clear mock history before each test to ensure isolation
    jest.clearAllMocks();
  });

  it('should render a MapContainer and TileLayer', () => {
    render(<MapClient />);
    expect(screen.getByTestId('MapContainer')).toBeInTheDocument();
    expect(screen.getByTestId('TileLayer')).toBeInTheDocument();
  });

  it('should call Marker with correct numeric coordinates', () => {
    const mockBreweries = [
      { id: '1', name: 'Brewery A', latitude: '10.5', longitude: '20.5' },
      { id: '3', name: 'Brewery C', latitude: null, longitude: '50.5' }, // Invalid
    ];

    render(<MapClient breweries={mockBreweries} />);

    // Expect the Marker mock to have been called once
    expect(Marker).toHaveBeenCalledTimes(1);

    // Manually inspect the props of the first call to the mock
    const markerProps = Marker.mock.calls[0][0];

    // Check the position property directly
    expect(markerProps.position).toBeInstanceOf(Array);
    expect(markerProps.position[0]).toBe(10.5);
    expect(markerProps.position[1]).toBe(20.5);

    // Verify popup content is also rendered
    expect(screen.getByText('Brewery A')).toBeInTheDocument();
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