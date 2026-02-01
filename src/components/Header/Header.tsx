import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useFavorites } from '@/context/FavoritesContext'
import './Header.scss'

export default function Header() {
  const { favoriteIds } = useFavorites()
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
        <Link to="/favorites" className="header__icon header__heart" aria-label={`Favorites (${favoriteIds.size} items)`}>
          <svg width="28" height="26" viewBox="0 0 29 26" fill={favoriteIds.size > 0 ? '#FF0000' : 'none'} stroke={favoriteIds.size > 0 ? '#FF0000' : 'currentColor'} strokeWidth="1.4">
            <path d="M14.5 25.5C14.5 25.5 2 17 2 8.5C2 4 5 1 9 1C11.5 1 13.5 2.5 14.5 4C15.5 2.5 17.5 1 20 1C24 1 27 4 27 8.5C27 17 14.5 25.5 14.5 25.5Z" />
          </svg>
          {favoriteIds.size > 0 && <span className="header__heart-count">{favoriteIds.size}</span>}
        </Link>
        <Link to="/cart" className="header__icon header__cart" aria-label="Cart">
          <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
          </svg>
        </Link>
        <Link to="/profile" className="header__icon header__user" aria-label="Profile">
          <svg width="26" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>
    </header>
  )
}
