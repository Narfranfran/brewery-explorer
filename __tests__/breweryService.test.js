// __tests__/breweryService.test.js
import { getBreweries, getBreweryById } from '../app/services/breweryService';

// Mockear la función fetch global
global.fetch = jest.fn();

describe('breweryService', () => {

  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getBreweries', () => {
    it('should fetch breweries with given params', async () => {
      const mockBreweries = [{ id: 1, name: 'Test Brewery' }];
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBreweries,
      });

      const params = { by_city: 'test_city' };
      const data = await getBreweries(params);

      expect(fetch).toHaveBeenCalledWith('https://api.openbrewerydb.org/v1/breweries?by_city=test_city');
      expect(data).toEqual(mockBreweries);
    });

    it('should throw an error if the network response is not ok', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      await expect(getBreweries({})).rejects.toThrow('Error de red: 404 - Not Found');
    });
  });

  describe('getBreweryById', () => {
    it('should fetch a single brewery by id', async () => {
      const mockBrewery = { id: 'test-id', name: 'Single Test Brewery' };
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockBrewery,
      });

      const data = await getBreweryById('test-id');

      expect(fetch).toHaveBeenCalledWith('https://api.openbrewerydb.org/v1/breweries/test-id');
      expect(data).toEqual(mockBrewery);
    });

    it('should throw an error if no id is provided', async () => {
      await expect(getBreweryById()).rejects.toThrow('Se requiere un ID para obtener una cervecería.');
    });

    it('should throw an error if the network response is not ok', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      });

      await expect(getBreweryById('any-id')).rejects.toThrow('Error de red: 500 - Internal Server Error');
    });
  });
});
