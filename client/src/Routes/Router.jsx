import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import ProductList from "../pages/shop/ProductList";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import Signin from "../components/signIn";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: (
          <PrivateRouter>
            <ProductList />
          </PrivateRouter>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
    ],
  },
  {
    path:"/signin",
    element:<Signin/>
  }
]);



export default router