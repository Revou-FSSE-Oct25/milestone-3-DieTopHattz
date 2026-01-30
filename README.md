revoshop/
├── app/
│ ├── layout.tsx # Root layout with providers
│ ├── page.tsx # Home page (Product listing)
│ ├── products/
│ │ └── [id]/
│ │ └── page.tsx # Product detail pages (SSR)
│ ├── cart/
│ │ └── page.tsx # Shopping cart page
│ ├── checkout/
│ │ ├── page.tsx # Checkout process
│ │ └── success/
│ │ └── page.tsx # Order success page
│ ├── about/
│ │ └── page.tsx # About page (SSG)
│ ├── faq/
│ │ └── page.tsx # FAQ page (SSG)
│ ├── providers/
│ │ ├── CartProvider.tsx # Global cart state management
│ │ └── ToastProvider.tsx # Notification system
│ └── globals.css # Global styles
├── components/
│ ├── Header.tsx # Navigation header
│ ├── Footer.tsx # Site footer
│ ├── ProductCard.tsx # Product listing card
│ └── AddToCartButton.tsx # Add to cart component
├── lib/
│ └── api.ts # API utility functions
├── public/ # Static assets
└── package.json

text

## 🛠️ Technologies Used

### Frontend Stack
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **React Icons** - Icon library
- **Lucide React** - Additional icons

### APIs & Data
- **FakeStoreAPI** - Mock product data
- **LocalStorage** - Cart persistence
- **React Context API** - State management

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd revoshop
Install dependencies

bash
npm install
Run development server

bash
npm run dev
Open your browser

text
http://localhost:3000
Building for Production
bash
# Build the application
npm run build

# Start the production server
npm start
📱 Pages Overview
🏠 Home Page (/)
Product grid display with images, names, and prices

Hero section with promotions

Category filtering

Responsive product cards with hover effects

🛍️ Product Details (/products/[id])
High-quality product images

Detailed description and specifications

Customer ratings and reviews

Add to cart with quantity selector

Related products section

🛒 Shopping Cart (/cart)
View all cart items with quantities

Adjust quantities or remove items

Real-time price calculation (subtotal, shipping, tax)

Apply promo codes

Proceed to checkout

💳 Checkout (/checkout)
Step 1: Shipping Information - Address and contact details

Step 2: Payment Details - Secure payment form

Step 3: Review Order - Final confirmation before purchase

Order summary sidebar

Multiple payment method support

✅ Order Success (/checkout/success)
Order confirmation with unique order number

Estimated delivery date

Order status tracking

Next steps and support information

ℹ️ Information Pages
About (/about) - Company information and values

FAQ (/faq) - Frequently asked questions

🎯 Technical Implementation
Data Fetching Strategies
SSG (Static Site Generation) - For static pages (About, FAQ)

SSR (Server-Side Rendering) - For dynamic product pages

Client-side Fetching - For cart and user interactions

State Management
typescript
// Cart Context provides global cart state
const { items, addToCart, removeFromCart, updateQuantity } = useCart();
Performance Optimizations
Image Optimization with Next.js Image component

Code Splitting automatic with Next.js

Lazy Loading for images and components

Prefetching for faster navigation

🔧 API Integration
FakeStoreAPI Endpoints
typescript
// Get all products
GET https://fakestoreapi.com/products

// Get single product
GET https://fakestoreapi.com/products/{id}

// Get categories
GET https://fakestoreapi.com/products/categories
Custom API Utilities (lib/api.ts)
typescript
export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products`);
  return response.json();
}
🎨 Design System
Color Palette
Color	Usage	Hex Code
Primary	Buttons, accents	#e74c3c
Secondary	Headers, text	#2c3e50
Background	Page background	#f8fafc
Success	Success messages	#10b981
Typography
Font Family: Inter (system font stack)

Headings: Bold, high contrast

Body Text: Readable, appropriate sizing

Components
Buttons: Consistent sizing and hover effects

Cards: Rounded corners, subtle shadows

Forms: Clear labels, validation states

Navigation: Persistent, mobile-friendly

📦 Deployment
Vercel (Recommended)
Push your code to GitHub

Import your project on Vercel

Deploy with default settings

Netlify
bash
# Build command
npm run build

# Publish directory
.next
Environment Variables
Create a .env.local file if needed:

env
# No API keys required for FakeStoreAPI
🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
FakeStoreAPI for providing mock product data

Next.js team for the amazing framework

Tailwind CSS for utility-first CSS

React Icons for icon library

📞 Support
For support, email support@revoshop.com or create an issue in the GitHub repository.