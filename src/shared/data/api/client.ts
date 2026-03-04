import axios, { AxiosError, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2', // Base URL for the PokeAPI
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json', // Indicates that data will be sent in JSON format
  },
});

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  // If the response is successful, return it
  (response: AxiosResponse) => {
    return response;
  },
  // If there is an error, handle it
  (error: AxiosError) => {
    // Error sent because of a timeout or network error
    if (error.code === 'ECONNABORTED') {
      console.error(
        'Network error: The request has exceeded the wait time (Timeout).',
      );

      // Error sent because the server responded with an error status code
    } else if (error.response) {
      console.error(
        `API error [${error.response.status}]:`,
        error.response.data,
      );
      // Error sent because no response was received from the server, could be a network error or the server is down
    } else if (error.request) {
      console.error(
        'Error: No response received from the server. It is possible that the server is down or there are network issues.',
        error.request,
      );
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  },
);

export default apiClient;
