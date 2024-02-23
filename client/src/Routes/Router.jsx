import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/Home';
import ProductList from "../pages/shop/ProductList";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/shop",
            element: <ProductList/>
        }
      ]
    },
  ]);



export default router