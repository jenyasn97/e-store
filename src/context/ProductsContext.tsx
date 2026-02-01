import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react'
import { fetchProducts, type Product, type ProductsResponse } from '@/api/products'
import localProductsData from '@/data/products.json'

interface ProductsContextValue {
  products: Product[]
  categories: ProductsResponse['categories']
  brands: ProductsResponse['brands']
  loading: boolean
  error: string | null
}

const localProducts = (localProductsData as { products?: Array<{ id: string; comments?: { author: string; rating: number; text: string }[]; rating?: number }> }).products ?? []
const localEnhancements = new Map<string, { comments: Product['comments']; rating: number }>()
for (const p of localProducts) {
  if (p.id && (p.comments?.length || p.rating != null)) {
    localEnhancements.set(p.id, { comments: p.comments ?? [], rating: p.rating ?? 0 })
  }
}

const ProductsContext = createContext<ProductsContextValue | null>(null)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProductsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
      .then(setData)
      .catch((err) => setError(err?.message ?? 'Failed to load products'))
      .finally(() => setLoading(false))
  }, [])

  const value = useMemo<ProductsContextValue>(() => {
    const apiProducts = data?.products ?? []
    const products: Product[] = apiProducts.map((p) => {
      const enh = localEnhancements.get(p.id)
      if (enh) {
        return { ...p, comments: enh.comments, rating: enh.rating }
      }
      return p
    })
    return {
      products,
      categories: data?.categories ?? {},
      brands: data?.brands ?? {},
      loading,
      error,
    }
  }, [data, loading, error])

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider')
  return ctx
}
