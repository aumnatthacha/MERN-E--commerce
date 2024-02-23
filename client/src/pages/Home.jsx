import Banner from '../components/Banner'
import Categories from './Categories'
import SpecialProduct from './SpecialProduct'
import Testimonials from './Testimonials'
import OurService from './OurService'
import ProductList from './shop/ProductList'

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