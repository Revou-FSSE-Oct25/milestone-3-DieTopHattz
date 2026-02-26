# RevoShop Performance Optimization Guide 🚀

## 1. Image Optimization

### Use LazyImage Component
```tsx
import LazyImage from '@/components/ui/LazyImage'

// Instead of regular img tag
<LazyImage 
  src={product.image}
  alt={product.title}
  className="w-48 h-48"
/>