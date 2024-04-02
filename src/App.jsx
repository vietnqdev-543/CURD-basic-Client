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


function App() {
  const style = {margin : '0 40px'}
  const Layout = () => {
    return(
      <>
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
    
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App
