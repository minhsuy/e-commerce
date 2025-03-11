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
import FinalRegister from './pages/public/FinalRegister';
import ResetPassword from './pages/public/ResetPassword';
import { Bounce, ToastContainer } from 'react-toastify';
import Modal from './components/Modal';
function App() {
  const dispath = useDispatch()
  useEffect(() => {
    dispath(getCategories())
  }, [])
  const { isShowModal, modalChildren } = useSelector((state) => state.app)
  return (
    <div className="font-main relative">
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.DETAIL_PRODUCT__CATEGORY__PID__TITLE} element={<DetailProduct />}></Route>
          <Route path={path.FAQ} element={<FAQ />}></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route path={path.CONTACT} element={<Contact />}></Route>

        </Route>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
        <Route path={path.LOGIN} element={<Login />}></Route>

      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}

export default App