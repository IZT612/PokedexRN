import apiClient from './client';

describe('HTTP Client Configuration', () => {
  it('baseURL should be the URL to the PokeAPI', () => {
    // We expect for the baseURL property to be exactly the same as the PokeAPI
    expect(apiClient.defaults.baseURL).toBe('https://pokeapi.co/api/v2');
  });

  it('It should have a timeout of 10 seconds', () => {
    // We check the timeout property, to make sure that it sends the timeout error after 10 seconds
    expect(apiClient.defaults.timeout).toBe(10000);
  });

  it('It should have the content type configured to JSON', () => {
    // We verify that we always send JSON
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json');
  });
});
