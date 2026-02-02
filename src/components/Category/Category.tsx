import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Category.scss";

const categories = [
  { id: "phones", name: "Phones", icon: "/images/icon-phones.svg" },
  { id: "tablets", name: "Tablets", icon: "/images/icon-tablets.svg" },
  { id: "smartwatches", name: "Smart Watches", icon: "/images/icon-watches.svg" },
  { id: "cameras", name: "Cameras", icon: "/images/icon-cameras.svg" },
  { id: "headphones", name: "Headphones", icon: "/images/icon-headphones.svg" },
  { id: "laptops", name: "Laptops", icon: "/images/icon-computers.svg" },
  { id: "gaming", name: "Gaming", icon: "/images/icon-gaming.svg" },
  { id: "accessories", name: "Accessories", icon: "/images/icon-accessories.svg" },
];

const CARD_WIDTH = 192;
const STEP = 2;
const SET_SIZE = categories.length * CARD_WIDTH;

export default function Category() {
  const [offset, setOffset] = useState(SET_SIZE);
  const [isAnimating, setIsAnimating] = useState(false);
  const [noTransition, setNoTransition] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.style.transform = `translateX(-${offset}px)`;
  }, [offset]);

  const slide = (direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    const delta = (direction === "left" ? -STEP : STEP) * CARD_WIDTH;
    const newOffset = offset + delta;
    setOffset(newOffset);
    setTimeout(() => {
      if (newOffset >= SET_SIZE * 2) {
        setNoTransition(true);
        setOffset(newOffset - SET_SIZE);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setNoTransition(false));
        });
      } else if (newOffset < SET_SIZE) {
        setNoTransition(true);
        setOffset(newOffset + SET_SIZE);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => setNoTransition(false));
        });
      }
      setIsAnimating(false);
    }, 300);
  };

  const infiniteCategories = [...categories, ...categories, ...categories];

  return (
    <section className="category">
      <div className="category__top">
        <h2 className="category__title">Browse By Category</h2>
        <div className="category__arrows" role="group" aria-label="Category navigation">
          <button
            type="button"
            className="category__arrow category__arrow--prev"
            onClick={() => slide("left")}
            aria-label="Previous categories">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" aria-hidden>
              <path
                d="M24 8L16 16l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="category__arrow category__arrow--next"
            onClick={() => slide("right")}
            aria-label="Next categories">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" aria-hidden>
              <path
                d="M16 8l8 8-8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="category__list-wrap">
        <div
          className={`category__list category__list--infinite ${
            noTransition ? "category__list--no-transition" : ""
          }`}
          ref={listRef}>
          {infiniteCategories.map((cat, i) => (
            <Link key={`${cat.id}-${i}`} to={`/catalog/${cat.id}`} className="category__card">
              <img src={cat.icon} alt={cat.name} width={48} height={48} />
              <span className="category__name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
