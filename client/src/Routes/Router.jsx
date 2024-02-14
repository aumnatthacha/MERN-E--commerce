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
        //การดึง shop เข้ามาใช้
      ]
    },
  ]);



export default router