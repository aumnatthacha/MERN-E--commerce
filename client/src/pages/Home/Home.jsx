import Banner from '../../components/Banner'
import Categories from '../Home/Categories'
import SpecialProduct from '../Home/SpecialProduct'
import Testimonials from '../Home/Testimonials'
import OurService from '../Home/OurService'
import ProductList from '../shop/ProductList'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Categories/>
        <SpecialProduct/>
        <Testimonials/>
        <OurService/>
        <ProductList/>
    </div>
  )
}

export default Home