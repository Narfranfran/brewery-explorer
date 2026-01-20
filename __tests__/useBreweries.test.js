// __tests__/useBreweries.test.js
import { renderHook, act, waitFor } from '@testing-library/react';
import useBreweries from '../app/hooks/useBreweries';
import * as breweryService from '../app/services/breweryService';

// Mockear el módulo breweryService
jest.mock('../app/services/breweryService');

describe('useBreweries hook', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start with loading state and fetch data on initial render', async () => {
    const mockData = [{ id: 1, name: 'Initial Load' }];
    breweryService.getBreweries.mockResolvedValue(mockData);

    const { result } = renderHook(() => useBreweries({ by_city: 'test' }));

    expect(result.current.isLoading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.data).toEqual(mockData);
    expect(breweryService.getBreweries).toHaveBeenCalledWith({ by_city: 'test' });
  });

  it('should fetch a single brewery when breweryId is provided', async () => {
    const mockBrewery = { id: 'single', name: 'Single Brewery' };
    breweryService.getBreweryById.mockResolvedValue(mockBrewery);

    const { result } = renderHook(() => useBreweries({ breweryId: 'single' }));

    await waitFor(() => {
      expect(result.current.data).toEqual(mockBrewery);
    });
    expect(breweryService.getBreweryById).toHaveBeenCalledWith('single');
  });

  it('should handle errors from the service', async () => {
    const mockError = new Error('API is down');
    breweryService.getBreweries.mockRejectedValue(mockError);

    const { result } = renderHook(() => useBreweries({}));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toEqual(mockError);
    expect(result.current.data).toBeNull();
  });

  it('should allow refetching with new params using fetchBreweries function', async () => {
    breweryService.getBreweries.mockResolvedValue([]); // Initial fetch
    
    const { result } = renderHook(() => useBreweries({}));
    
    await waitFor(() => {
      expect(breweryService.getBreweries).toHaveBeenCalledTimes(1);
    });

    const newMockData = [{ id: 2, name: 'New Fetch' }];
    breweryService.getBreweries.mockResolvedValue(newMockData);

    act(() => {
      result.current.fetchBreweries({ by_city: 'new_city' });
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toEqual(newMockData);
    expect(breweryService.getBreweries).toHaveBeenLastCalledWith({ by_city: 'new_city' });
    expect(breweryService.getBreweries).toHaveBeenCalledTimes(2);
  });
});
