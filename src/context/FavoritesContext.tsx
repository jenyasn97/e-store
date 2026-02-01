import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react'

const STORAGE_KEY = 'e-store-favorites'

interface FavoritesContextValue {
  favoriteIds: Set<string>
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  addFavorite: (id: string) => void
  removeFavorite: (id: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const arr = JSON.parse(raw) as string[]
      return new Set(Array.isArray(arr) ? arr : [])
    }
  } catch {
    // ignore
  }
  return new Set()
}

function saveToStorage(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
  } catch {
    // ignore
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(loadFromStorage)

  useEffect(() => {
    saveToStorage(favoriteIds)
  }, [favoriteIds])

  const isFavorite = useCallback((id: string) => favoriteIds.has(id), [favoriteIds])
  const addFavorite = useCallback((id: string) => setFavoriteIds((prev) => new Set(prev).add(id)), [])
  const removeFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }, [])
  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const value = useMemo(
    () => ({ favoriteIds, isFavorite, toggleFavorite, addFavorite, removeFavorite }),
    [favoriteIds, isFavorite, toggleFavorite, addFavorite, removeFavorite]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
