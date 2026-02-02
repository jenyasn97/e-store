import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { getProductImageUrl } from "@/api/products";
import "./CatalogPage.scss";

/* Figma node 179-1445: Products Page / Catalog */

const PRODUCTS_PER_PAGE = 12;
const SORT_OPTIONS = [
  { value: "rating", label: "By rating" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "title", label: "By name" },
] as const;

export default function CatalogPage() {
  const { category, brand: brandParam } = useParams<{ category: string; brand?: string }>();
  const { products, categories, brands, loading, error } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [categoryFilter, setCategoryFilter] = useState<Set<string>>(new Set());
  const [brandFilter, setBrandFilter] = useState<Set<string>>(new Set());
  const [brandSearch, setBrandSearch] = useState("");
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]["value"]>("rating");
  const [sortOpen, setSortOpen] = useState(false);
  const [brandExpanded, setBrandExpanded] = useState(true);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const validCategory = category && categories[category];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [category, brandParam]);

  useEffect(() => {
    if (category && categories[category]) {
      setCategoryFilter(new Set([category]));
    } else if (!category) {
      setCategoryFilter(new Set());
    }
  }, [category, categories]);

  useEffect(() => {
    if (brandParam && brands[brandParam]) {
      setBrandFilter(new Set([brandParam]));
    } else if (!brandParam) {
      setBrandFilter(new Set());
    }
  }, [brandParam, brands]);

  const activeCategories = categoryFilter;
  const categoryNames = Array.from(activeCategories).map((k) => categories[k]?.name ?? k);

  const filteredProducts = useMemo(() => {
    let list =
      activeCategories.size > 0
        ? products.filter((p) => activeCategories.has(p.category))
        : products;
    if (brandFilter.size > 0) {
      list = list.filter((p) => brandFilter.has(p.brand));
    }
    switch (sortBy) {
      case "rating":
        return [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      case "price-asc":
        return [...list].sort(
          (a, b) =>
            parseFloat(a.price.replace(/[^0-9.]/g, "")) -
            parseFloat(b.price.replace(/[^0-9.]/g, "")),
        );
      case "price-desc":
        return [...list].sort(
          (a, b) =>
            parseFloat(b.price.replace(/[^0-9.]/g, "")) -
            parseFloat(a.price.replace(/[^0-9.]/g, "")),
        );
      case "title":
        return [...list].sort((a, b) => a.title.localeCompare(b.title));
      default:
        return list;
    }
  }, [products, activeCategories, brandFilter, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const categoryBrands = useMemo(() => {
    const sourceProducts =
      activeCategories.size > 0
        ? products.filter((p) => activeCategories.has(p.category))
        : products;
    const brandIds = new Set(sourceProducts.map((p) => p.brand));
    return Object.entries(brands)
      .filter(([id]) => brandIds.has(id))
      .map(([id, b]) => ({ id, name: b.name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [products, activeCategories, brands]);

  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return categoryBrands;
    const q = brandSearch.toLowerCase();
    return categoryBrands.filter((b) => b.name.toLowerCase().includes(q));
  }, [categoryBrands, brandSearch]);

  const toggleBrand = (id: string) => {
    setBrandFilter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setCurrentPage(1);
  };

  const toggleCategory = (key: string) => {
    setCategoryFilter((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategories, brandFilter]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  const activeBrandName = brandFilter.size === 1 ? brands[Array.from(brandFilter)[0]]?.name : null;
  const breadcrumbs: { label: string; path?: string }[] = [
    { label: "Home", path: "/" },
    { label: "Catalog", path: "/catalog" },
    ...(categoryNames.length > 0 ? [{ label: categoryNames.join(", ") }] : []),
    ...(activeBrandName ? [{ label: activeBrandName }] : []),
  ];

  if (category && !validCategory && !loading) {
    return <Navigate to="/catalog" replace />;
  }

  if (loading) {
    return (
      <div className="catalog-page">
        <div className="catalog-page__content catalog-page__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="catalog-page">
        <div className="catalog-page__content catalog-page__error">{error}</div>
      </div>
    );
  }

  return (
    <div className="catalog-page catalog-page--enter">
      <div className="catalog-page__content">
        <nav className="catalog-page__breadcrumbs" aria-label="Breadcrumb">
          {breadcrumbs.map((b, i) => (
            <span key={b.label + i} className="catalog-page__breadcrumb-item">
              {i > 0 && (
                <span className="catalog-page__breadcrumb-sep" aria-hidden>
                  ›
                </span>
              )}
              {b.path ? (
                <Link to={b.path} className="catalog-page__breadcrumb-link">
                  {b.label}
                </Link>
              ) : (
                <span className="catalog-page__breadcrumb-current">{b.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="catalog-page__main">
          <aside className="catalog-page__filters">
            <div className="catalog-page__filter-section">
              <button
                type="button"
                className="catalog-page__filter-header"
                onClick={() => setCategoryExpanded(!categoryExpanded)}
                aria-expanded={categoryExpanded}>
                <span>Category</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={categoryExpanded ? "catalog-page__filter-chevron--up" : ""}>
                  <path
                    d="M18 15l-6-6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {categoryExpanded && (
                <div className="catalog-page__filter-body">
                  <div className="catalog-page__filter-checkboxes">
                    {Object.entries(categories).map(([key, c]) => (
                      <label key={key} className="catalog-page__checkbox">
                        <input
                          type="checkbox"
                          checked={activeCategories.has(key)}
                          onChange={() => toggleCategory(key)}
                        />
                        <span className="catalog-page__checkbox-box" />
                        <span>{c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="catalog-page__filter-section">
              <button
                type="button"
                className="catalog-page__filter-header"
                onClick={() => setBrandExpanded(!brandExpanded)}
                aria-expanded={brandExpanded}>
                <span>Brand</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={brandExpanded ? "catalog-page__filter-chevron--up" : ""}>
                  <path
                    d="M18 15l-6-6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {brandExpanded && (
                <div className="catalog-page__filter-body">
                  <div className="catalog-page__filter-search">
                    <img src="/images/search-icon.svg" alt="" width={24} height={24} aria-hidden />
                    <input
                      type="search"
                      placeholder="Search"
                      value={brandSearch}
                      onChange={(e) => setBrandSearch(e.target.value)}
                      className="catalog-page__filter-search-input"
                    />
                  </div>
                  <div className="catalog-page__filter-checkboxes">
                    {filteredBrands.map((b) => (
                      <label key={b.id} className="catalog-page__checkbox">
                        <input
                          type="checkbox"
                          checked={brandFilter.has(b.id)}
                          onChange={() => toggleBrand(b.id)}
                        />
                        <span className="catalog-page__checkbox-box" />
                        <span>{b.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {[
              "Battery capacity",
              "Screen type",
              "Screen diagonal",
              "Protection class",
              "Built-in memory",
            ].map((label) => (
              <div
                key={label}
                className="catalog-page__filter-section catalog-page__filter-section--collapsed">
                <button type="button" className="catalog-page__filter-header" aria-expanded="false">
                  <span>{label}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </aside>

          <section className="catalog-page__products">
            <div className="catalog-page__products-top">
              <div className="catalog-page__products-count">
                <span className="catalog-page__products-count-label">Selected Products:</span>
                <span className="catalog-page__products-count-value">
                  {filteredProducts.length}
                </span>
              </div>
              <div className="catalog-page__sort">
                <button
                  type="button"
                  className="catalog-page__sort-btn"
                  onClick={() => setSortOpen(!sortOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={sortOpen}>
                  <span>{SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "By rating"}</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {sortOpen && (
                  <>
                    <div
                      className="catalog-page__sort-backdrop"
                      onClick={() => setSortOpen(false)}
                      aria-hidden
                    />
                    <ul className="catalog-page__sort-dropdown" role="listbox">
                      {SORT_OPTIONS.map((opt) => (
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={sortBy === opt.value}
                          className={`catalog-page__sort-option ${
                            sortBy === opt.value ? "catalog-page__sort-option--active" : ""
                          }`}
                          onClick={() => {
                            setSortBy(opt.value);
                            setSortOpen(false);
                          }}>
                          {opt.label}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="catalog-page__grid">
              {paginatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  image={getProductImageUrl(p.image)}
                  liked={isFavorite(p.id)}
                  onLikeToggle={() => toggleFavorite(p.id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="catalog-page__pagination" aria-label="Pagination">
                <button
                  type="button"
                  className="catalog-page__pagination-arrow"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className="catalog-page__pagination-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`catalog-page__pagination-num ${
                        currentPage === page ? "catalog-page__pagination-num--active" : ""
                      }`}
                      onClick={() => setCurrentPage(page)}>
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="catalog-page__pagination-arrow"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </nav>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
