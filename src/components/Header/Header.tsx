import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')
  const { pathname } = useLocation()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo" aria-label="E-Store Home">
        <img src="/images/logo.svg" alt="E-Store" width={65} height={23} />
      </Link>
      <form className="header__search" onSubmit={(e) => { e.preventDefault(); /* search */ }} role="search">
        <img src="/images/search-icon.svg" alt="" width={24} height={24} aria-hidden />
        <input
          type="search"
          className="header__search-input"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Search products"
        />
      </form>
      <nav className="header__nav">
        <Link to="/" className={`header__nav-link ${isActive('/') && pathname === '/' ? 'header__nav-link--active' : ''}`}>Home</Link>
        <Link to="/catalog" className={`header__nav-link ${isActive('/catalog') ? 'header__nav-link--active' : ''}`}>Catalog</Link>
        <Link to="/contact" className="header__nav-link">Contact Us</Link>
      </nav>
      <div className="header__icons">
        <img src="/images/header-icons.svg" alt="" width={144} height={32} />
      </div>
    </header>
  )
}
