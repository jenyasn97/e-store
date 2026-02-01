import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './MainLayout.scss'

export default function MainLayout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <div className="main-layout">
      <Header />
      <main key={location.pathname} className="main-layout__content">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
