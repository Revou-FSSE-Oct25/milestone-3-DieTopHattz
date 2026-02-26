// Helper function to revalidate pages after product updates
export async function revalidateProductPages(productId?: number) {
  const pathsToRevalidate = [
    '/', // Home page
    '/products', // Products listing
  ];
  
  // Add product detail page if ID is provided
  if (productId) {
    pathsToRevalidate.push(`/products/${productId}`);
  }

  // In a real app, you'd call an API route to trigger revalidation
  // For now, we'll just log it
  console.log('🔄 Pages to revalidate:', pathsToRevalidate);
  
  return pathsToRevalidate;
}

// Generate unique ID for new products
export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}