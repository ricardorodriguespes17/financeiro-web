import api from '../../src/services/api'
import { describe, test, expect } from 'vitest'

describe('API', () => {
  const API_URL = import.meta.env.VITE_API_URL

  test('env API url should be correct', () => {
    expect(API_URL).toBeDefined()
  })

  test('should create an axios instance with the correct baseURL', () => {
    expect(api.defaults.baseURL).toBe(API_URL)
  })

  test('should make a GET request to the correct URL', async () => {
    const response = await api.get('/')

    expect(response.status).toBe(200)
  })
})
