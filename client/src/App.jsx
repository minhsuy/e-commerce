import { Routes, Route } from 'react-router-dom';
import path from './utils/path'
import Public from './pages/public/Public';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import { getCategories } from './store/app/asyncAction';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import Blogs from './pages/public/Blogs';
import DetailProduct from './pages/public/DetailProduct';
import FAQ from './pages/public/FAQ.JSX';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Products from './pages/public/Products';
function App() {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(getCategories())
  }, [])
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
          <Route path={path.CONTACT} element={<Contact />}></Route>
        </Route>
        <Route path={path.LOGIN} element={<Login />}></Route>

      </Routes>
    </div>
  )
}

export default App