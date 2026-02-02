import { useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { useProducts } from "@/context/ProductsContext";
import { useFavorites } from "@/context/FavoritesContext";
import { getProductImageUrl } from "@/api/products";
import "./Products.scss";

const tabs = ["New Arrival", "Bestseller", "Featured Products"];

export default function Products() {
  const [activeTab, setActiveTab] = useState(0);
  const { products: allProducts, loading, error } = useProducts();
  const { isFavorite, toggleFavorite } = useFavorites();

  const products = useMemo(() => {
    const startIndex = activeTab * 8;
    return allProducts.slice(startIndex, startIndex + 8);
  }, [activeTab, allProducts]);

  if (loading)
    return (
      <section className="products">
        <div className="products__loading">Loading...</div>
      </section>
    );
  if (error)
    return (
      <section className="products">
        <div className="products__error">{error}</div>
      </section>
    );

  return (
    <section className="products">
      <div className="products__tags">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            type="button"
            className={`products__tag ${activeTab === i ? "products__tag--active" : ""}`}
            onClick={() => setActiveTab(i)}>
            <span>{tab}</span>
            {activeTab === i && <span className="products__tag-line" />}
          </button>
        ))}
      </div>
      <div className="products__grid">
        <div className="products__row">
          {products.slice(0, 4).map((p) => (
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
        <div className="products__row">
          {products.slice(4, 8).map((p) => (
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
      </div>
    </section>
  );
}
