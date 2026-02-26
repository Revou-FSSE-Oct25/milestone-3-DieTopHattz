import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const productsPath = path.join(process.cwd(), 'lib/db/products.json')

async function readProducts() {
  const data = await fs.readFile(productsPath, 'utf8')
  return JSON.parse(data)
}

async function writeProducts(products: any[]) {
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2))
}

// GET /api/products/[id] - Get single product
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)
    const products = await readProducts()
    const product = products.find((p: any) => p.id === id)
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)
    const body = await request.json()
    const products = await readProducts()
    
    const index = products.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    // Update product
    products[index] = {
      ...products[index],
      ...body,
      updatedAt: new Date().toISOString()
    }
    
    await writeProducts(products)
    
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)
    const products = await readProducts()
    
    const filteredProducts = products.filter((p: any) => p.id !== id)
    
    if (filteredProducts.length === products.length) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    
    await writeProducts(filteredProducts)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}