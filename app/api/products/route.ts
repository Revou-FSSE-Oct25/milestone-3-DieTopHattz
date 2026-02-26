import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { generateId } from '@/lib/utils/revalidate'

// Path to products JSON file
const productsPath = path.join(process.cwd(), 'lib/db/products.json')

// Helper function to read products
async function readProducts() {
  try {
    const data = await fs.readFile(productsPath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

// Helper function to write products
async function writeProducts(products: any[]) {
  try {
    await fs.writeFile(productsPath, JSON.stringify(products, null, 2))
    return true
  } catch (error) {
    console.error('Error writing products:', error)
    return false
  }
}

// GET /api/products - Get all products
export async function GET() {
  try {
    const products = await readProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const products = await readProducts()
    
    // Validate required fields
    if (!body.title || !body.price || !body.description || !body.category || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new product
    const newProduct = {
      id: generateId(),
      ...body,
      rating: {
        rate: 0,
        count: 0
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    products.push(newProduct)
    await writeProducts(products)
    
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}