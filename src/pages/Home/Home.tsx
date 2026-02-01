import Banner from '@/components/Banner'
import SmallerBanners from '@/components/SmallerBanners'
import Category from '@/components/Category'
import Products from '@/components/Products'
import BannersSection from '@/components/BannersSection'
import DiscountProducts from '@/components/DiscountProducts'
import SummerBanner from '@/components/SummerBanner'
import './Home.scss'

export default function Home() {
  return (
    <div className="home">
      <Banner />
      <SmallerBanners />
      <Category />
      <Products />
      <BannersSection />
      <DiscountProducts />
      <SummerBanner />
    </div>
  )
}
