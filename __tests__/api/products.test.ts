import { createMocks } from 'node-mocks-http'
import { GET, POST } from '@/app/api/products/route'
import { GET as GET_SINGLE, PUT, DELETE } from '@/app/api/products/[id]/route'

// Mock the file system
jest.mock('fs/promises')

describe('Products API', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 29.99,
      description: 'Description 1',
      category: 'test',
      image: 'test1.jpg',
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 39.99,
      description: 'Description 2',
      category: 'test',
      image: 'test2.jpg',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
    // Mock file read
    require('fs/promises').readFile.mockResolvedValue(JSON.stringify(mockProducts))
    require('fs/promises').writeFile.mockResolvedValue(undefined)
  })

  describe('GET /api/products', () => {
    it('returns all products', async () => {
      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data).toEqual(mockProducts)
    })

    it('handles errors gracefully', async () => {
      require('fs/promises').readFile.mockRejectedValue(new Error('File error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Failed to fetch products')
    })
  })

  describe('POST /api/products', () => {
    it('creates a new product', async () => {
      const newProduct = {
        title: 'New Product',
        price: 49.99,
        description: 'New Description',
        category: 'test',
        image: 'new.jpg',
      }

      const { req } = createMocks({
        method: 'POST',
        body: newProduct,
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.title).toBe('New Product')
      expect(data.id).toBeDefined()
      expect(data.createdAt).toBeDefined()
    })

    it('validates required fields', async () => {
      const { req } = createMocks({
        method: 'POST',
        body: { title: 'Incomplete' },
      })

      const response = await POST(req as any)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Missing required fields')
    })
  })

  describe('GET /api/products/[id]', () => {
    it('returns a single product', async () => {
      const params = Promise.resolve({ id: '1' })
      const response = await GET_SINGLE({} as Request, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.id).toBe(1)
    })

    it('returns 404 for non-existent product', async () => {
      const params = Promise.resolve({ id: '999' })
      const response = await GET_SINGLE({} as Request, { params })

      expect(response.status).toBe(404)
    })
  })

  describe('PUT /api/products/[id]', () => {
    it('updates a product', async () => {
      const updates = { title: 'Updated Title', price: 99.99 }
      const params = Promise.resolve({ id: '1' })

      const { req } = createMocks({
        method: 'PUT',
        body: updates,
      })

      const response = await PUT(req as any, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.title).toBe('Updated Title')
      expect(data.price).toBe(99.99)
      expect(data.updatedAt).toBeDefined()
    })

    it('returns 404 for non-existent product', async () => {
      const params = Promise.resolve({ id: '999' })
      const { req } = createMocks({
        method: 'PUT',
        body: { title: 'Updated' },
      })

      const response = await PUT(req as any, { params })
      expect(response.status).toBe(404)
    })
  })

  describe('DELETE /api/products/[id]', () => {
    it('deletes a product', async () => {
      const params = Promise.resolve({ id: '1' })
      const response = await DELETE({} as Request, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('returns 404 for non-existent product', async () => {
      const params = Promise.resolve({ id: '999' })
      const response = await DELETE({} as Request, { params })
      expect(response.status).toBe(404)
    })
  })
})