import { render, screen, waitFor } from '@testing-library/react';
import DashboardPage from '../app/dashboard/page.js';

// Mock the useBreweries hook
jest.mock('../app/hooks/useBreweries', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the Map component
jest.mock('../app/components/Map', () => {
  const MockMap = jest.fn(() => <div data-testid="mock-map">Mock Map</div>);
  MockMap.displayName = 'MockMap';
  return {
    __esModule: true,
    default: MockMap,
  };
});

// Import the mocked hook and component after mocks are set up
const useBreweries = require('../app/hooks/useBreweries').default;
const MockMap = require('../app/components/Map').default; // Import the actual mock function from the mocked module

describe('DashboardPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useBreweries.mockClear();
    MockMap.mockClear();
  });

  it('should render the main heading', () => {
    // Mock useBreweries to return some data to avoid errors, even if not directly tested here
    useBreweries.mockReturnValue({
      breweries: [],
      isLoading: false,
      error: null,
      fetchBreweries: jest.fn(),
      currentPage: 1,
      totalPages: 1,
      setSearchTerm: jest.fn(),
      setSelectedBreweryType: jest.fn(),
      setSelectedCity: jest.fn(),
      goToPage: jest.fn(),
    });

    render(<DashboardPage />);
    const heading = screen.getByRole('heading', {
      name: /Dashboard/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render the Map component', async () => {
    useBreweries.mockReturnValue({
      breweries: [],
      isLoading: false,
      error: null,
      fetchBreweries: jest.fn(),
      currentPage: 1,
      totalPages: 1,
      setSearchTerm: jest.fn(),
      setSelectedBreweryType: jest.fn(),
      setSelectedCity: jest.fn(),
      goToPage: jest.fn(),
    });

    render(<DashboardPage />);
    await waitFor(() => {
      expect(screen.getByTestId('mock-map')).toBeInTheDocument();
    });
  });

  it('should pass breweries data to the Map component', async () => {
    const mockBreweries = [{ id: '1', name: 'Test Brewery', latitude: '10', longitude: '20' }];
    useBreweries.mockReturnValue({
      breweries: mockBreweries,
      isLoading: false,
      error: null,
      fetchBreweries: jest.fn(),
      currentPage: 1,
      totalPages: 1,
      setSearchTerm: jest.fn(),
      setSelectedBreweryType: jest.fn(),
      setSelectedCity: jest.fn(),
      goToPage: jest.fn(),
    });

    render(<DashboardPage />);
    await waitFor(() => {
      expect(MockMap).toHaveBeenCalledWith(
        expect.objectContaining({ breweries: mockBreweries }),
        undefined
      );
    });
  });
});

