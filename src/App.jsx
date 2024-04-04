import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import HomePage from './pages/home/HomePage'
import ProductPage from './pages/product/ProductPage';
import NotFound from './pages/notFound/NotFound';
import LoginPage from './pages/login/LoginPage';
import Header from './components/header/Header';
import RegisterPage from './pages/register/Register';
import Marquee from './components/marquee/Marquee';
import LayoutAdmin from './pages/admin/layoutAdmin/LayoutAdmin';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard';
import AdminProduct from './pages/admin/adminProduct.jsx/AdminProduct';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AdminUser from './pages/admin/adminUser/AdminUser';
import AdminCategory from './pages/admin/adminCategory/AdminCategory' ;
import AdminOrder from './pages/admin/adminOrder/AdminOrder'


function App() {
  const style = {margin : '0 40px'}
  const Layout = () => {
    return(
      <>
      <Marquee />
      <Header />
      <div style={style}>
      <Outlet />
      </div>
      </>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element : <Layout /> ,
      errorElement : <NotFound /> ,
      children : [
        {index: true , element : <HomePage />} ,
        {path : '/product' , element : <ProductPage />},
        {path : '/login' , element :<LoginPage />},
        {path : '/register' , element : <RegisterPage />}
      ]
      
    },
    {
      path:'/admin',
      element : <ProtectedRoute>
        <LayoutAdmin />
      </ProtectedRoute> ,
      errorElement : <NotFound /> ,
      children : [
        {index: true , element : <AdminDashboard />} ,
        {path :'user' , element: <AdminUser />},
        {path :'product' , element: <AdminProduct />},
        {path :'category' , element: <AdminCategory />},
        {path :'order' , element: <AdminOrder />},

      ]
    }
    
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
