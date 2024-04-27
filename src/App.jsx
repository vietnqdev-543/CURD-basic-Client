import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import ProductPage from './pages/productPage/ProductPage';
import NotFound from './components/notFound/NotFound';
import LoginPage from './pages/loginPage/LoginPage';
import Header from './pages/headerPage/Header';
import RegisterPage from './pages/registerPage/Register';
import Marquee from './components/marquee/Marquee';
import LayoutAdmin from './pages/adminPage/layoutAdmin/LayoutAdmin';
import AdminDashboard from './pages/adminPage/adminDashboard/AdminDashboard';
import AdminProduct from './pages/adminPage/adminProduct.jsx/AdminProduct';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import AdminUser from './pages/adminPage/adminUser/AdminUser';
import AdminCategory from './pages/adminPage/adminCategory/AdminCategory' ;
import AdminOrder from './pages/adminPage/adminOrder/AdminOrder'
import ProductDetail from './pages/productPage/ProductDetail/ProductDetail';
import Blog from './pages/blogPage/Blog';
import Footer from './pages/footerPage/Footer'
import HomePage from './pages/homePage/HomePage';
import {useSelector} from 'react-redux'
import ContactPage from './pages/contactPage/ContactPage';
import Cart from './pages/cartPage/Cart';
import SuccesfullyOrder from './components/successfullyOrder/SuccesfullyOrder';
import OrderManager from './pages/cartPage/orderManager/OrderManager';

function App() {
  const style = {margin : '0 40px'}
  const isLogin = useSelector(state=>state.account.isLogin) 
  const Layout = () => {
    return(
      <>
      <Marquee />
      <Header />
      <div style={style}>
      <Outlet />
      </div>
      <Footer />
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
        {path : '/register' , element : <RegisterPage />} ,
        {path : `product/:slug` ,element: <ProductDetail />} ,
        {path : '/blog' , element : <Blog />} ,
        {path : '/contact' , element: <ContactPage />},
        {path:'/cart' , element: <Cart/>} ,
        {path:'/sucessfullyOrder' , element : <SuccesfullyOrder />},
        {path : '/orderManager' , element: <OrderManager />}
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
