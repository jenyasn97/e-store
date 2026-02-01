import { useState } from 'react'
import ProductCard from '../ProductCard'
import './Products.scss'

const tabs = ['New Arrival', 'Bestseller', 'Featured Products']
const products = [
  { id: '1', title: 'Apple iPhone 14 Pro Max 128GB Deep Purple', price: '$900', image: '/images/product-iphone.png', liked: false },
  { id: '2', title: 'Blackmagic Pocket Cinema Camera 6k', price: '$2535', image: '/images/product-camera.png', liked: false },
  { id: '3', title: 'Apple Watch Series 9 GPS 41mm Starlight Aluminium', price: '$399', image: '/images/product-watch.png', liked: false },
  { id: '4', title: 'AirPods Max Silver Starlight Aluminium', price: '$549', image: '/images/product-airpods.png', liked: false },
  { id: '5', title: 'Samsung Galaxy Watch6 Classic 47mm Black', price: '$369', image: '/images/product-galaxy-watch.png', liked: false },
  { id: '6', title: 'Galaxy Z Fold5 Unlocked | 256GB | Phantom Black', price: '$1799', image: '/images/product-fold.png', liked: true },
  { id: '7', title: 'Galaxy Buds FE Graphite', price: '$99.99', image: '/images/product-buds.png', liked: false },
  { id: '8', title: 'Apple iPad 9 10.2" 64GB Wi-Fi Silver (MK2L3) 2021', price: '$398', image: '/images/product-ipad.png', liked: false },
]

export default function Products() {
  const [activeTab, setActiveTab] = useState(0)
  return (
    <section className="products">
      <div className="products__tags">
        {tabs.map((tab, i) => (
          <button key={tab} type="button" className={`products__tag ${activeTab === i ? 'products__tag--active' : ''}`} onClick={() => setActiveTab(i)}>
            <span>{tab}</span>
            {activeTab === i && <span className="products__tag-line" />}
          </button>
        ))}
      </div>
      <div className="products__grid">
        <div className="products__row">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} liked={p.liked} />)}
        </div>
        <div className="products__row">
          {products.slice(4, 8).map((p) => <ProductCard key={p.id} title={p.title} price={p.price} image={p.image} liked={p.liked} />)}
        </div>
      </div>
    </section>
  )
}
