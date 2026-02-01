import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductsProvider } from '@/context/ProductsContext'
import { FavoritesProvider } from '@/context/FavoritesContext'
import MainLayout from '@/components/MainLayout'
import Home from '@/pages/Home'
import ProductDetailsPage from '@/pages/ProductDetailsPage'
import CatalogPage from '@/pages/CatalogPage'
import FavoritesPage from '@/pages/FavoritesPage'
import CartPage from '@/pages/CartPage'
import ProfilePage from '@/pages/ProfilePage'
import '@/styles/_base.scss'

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <FavoritesProvider>
          <div className="app-container">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:category/:brand?" element={<CatalogPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Route>
          </Routes>
        </div>
        </FavoritesProvider>
      </ProductsProvider>
    </BrowserRouter>
  )
}
