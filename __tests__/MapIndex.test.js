import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

// Mock next/dynamic
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: jest.fn((loader, options) => {
    const DynamicComponent = React.lazy(() => loader());
    return props => (
      <React.Suspense fallback={options.loading ? options.loading() : null}>
        <DynamicComponent {...props} />
      </React.Suspense>
    );
  }),
}));

const MockMapClient = jest.fn(() => <div data-testid="mock-map-client">Mock Map Client</div>);
MockMapClient.displayName = 'MockMapClient';

jest.mock('../app/components/Map/MapClient', () => ({
  __esModule: true,
  default: MockMapClient,
}));

// Import the component after mocks are set up
const Map = require('../app/components/Map').default;

describe('Map (dynamic wrapper)', () => {
  beforeEach(() => {
    MockMapClient.mockClear(); // Clear mock calls before each test
  });

  it('should display a loading message initially', () => {
    render(<Map />);
    expect(screen.getByText('Cargando mapa...')).toBeInTheDocument();
    expect(screen.queryByTestId('mock-map-client')).not.toBeInTheDocument();
  });

  it('should render MapClient after loading', async () => {
    render(<Map breweries={[]} />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-map-client')).toBeInTheDocument();
    });
    expect(screen.queryByText('Cargando mapa...')).not.toBeInTheDocument();
  });

  it('should pass breweries prop to MapClient', async () => {
    const mockBreweries = [{ id: '1', name: 'Test Brewery' }];
    render(<Map breweries={mockBreweries} />);

    await waitFor(() => {
      expect(screen.getByTestId('mock-map-client')).toBeInTheDocument();
    });

    const MockMapClient = require('../app/components/Map/MapClient').default;
    expect(MockMapClient).toHaveBeenCalledTimes(1);
    const lastCallProps = MockMapClient.mock.calls[0][0]; // Get the first argument of the first call (props)
    expect(lastCallProps).toEqual(expect.objectContaining({ breweries: mockBreweries }));
  });
});