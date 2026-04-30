import axios from 'axios'

// Connects to sample-legacy-app backend
const client = axios.create({
  baseURL: process.env.LEGACY_API_URL || 'http://localhost:3000',
  timeout: 10000,
})

export const getUsers = () => client.get('/api/users')
export const getMetrics = () => client.get('/api/metrics')
export const postEvent = (data) => client.post('/api/events', data)

export default client
