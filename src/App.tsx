import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductsProvider } from '@/context/ProductsContext'
import MainLayout from '@/components/MainLayout'
import Home from '@/pages/Home'
import ProductDetailsPage from '@/pages/ProductDetailsPage'
import CatalogPage from '@/pages/CatalogPage'
import '@/styles/_base.scss'

export default function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <div className="app-container">
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<CatalogPage />} />
              <Route path="/catalog/:category/:brand?" element={<CatalogPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Route>
          </Routes>
        </div>
      </ProductsProvider>
    </BrowserRouter>
  )
}
