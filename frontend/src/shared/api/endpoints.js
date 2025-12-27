import apiClient from './client'

export const healthApi = {
  check: () => apiClient.get('/api/health'),
}

// Future API endpoints will be added here
// export const authApi = {
//   login: (credentials) => apiClient.post('/api/auth/login', credentials),
//   register: (userData) => apiClient.post('/api/auth/register', userData),
// };
