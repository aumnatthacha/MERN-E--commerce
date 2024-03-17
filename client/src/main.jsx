import ReactDOM from 'react-dom/client'
import './index.css'
import router from './Routes/Router.jsx'
import {RouterProvider} from "react-router-dom";
import "./App.css"
import AuthProvider from './context/AuthProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  
)
