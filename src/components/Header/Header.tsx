import { useState } from 'react'
import './Header.scss'

export default function Header() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <header className="header">
      <a href="/" className="header__logo" aria-label="E-Store Home">
        <img src="/images/logo.svg" alt="E-Store" width={65} height={23} />
      </a>
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
        <a href="/" className="header__nav-link header__nav-link--active">Home</a>
        <a href="/about" className="header__nav-link">About</a>
        <a href="/contact" className="header__nav-link">Contact Us</a>
        <a href="/blog" className="header__nav-link">Blog</a>
      </nav>
      <div className="header__icons">
        <img src="/images/header-icons.svg" alt="" width={144} height={32} />
      </div>
    </header>
  )
}
