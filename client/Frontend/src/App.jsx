
import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/Layout"
import Login from "./Pages/auth/Login"
import Register from "./Pages/auth/Register"
import AdminLayout from "./components/admin-view/Layout"
import AdminDashboard from "./Pages/auth/admin/dashboard"
import AdminFeatures from "./Pages/auth/admin/features"
import AdminOrders from "./Pages/auth/admin/order"
import ShoppingLayout from "./components/shopping-view/layout"
import ShoppingHome from "./Pages/auth/shopping-view/home"
import ShoppingListing from "./Pages/auth/shopping-view/listing"
import ShoppingCheckout from "./Pages/auth/shopping-view/checkout"
import ShoppingAccount from "./Pages/auth/shopping-view/account"
import PageNotFound from "./Pages/pagenotfound"
import UnAuthPage from "./Pages/Unauthpage"
import CheckAuth from "./components/common/check-auth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./slice/AuthSlice"
import SearchProduct from "./Pages/auth/shopping-view/SearchProduct"





function App() {
     const {user,isAuthenticated,isloading} = useSelector(state => state.auth)
     const dispatch = useDispatch()

     useEffect(()=>{
       const token = JSON.parse(sessionStorage.getItem("token"));
       dispatch(checkAuth(token));
     },[dispatch])

     const Loader = () => (
      <div className="flex justify-center items-center fixed inset-0 bg-white bg-opacity-75 z-50">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
      </div>
    );
    
    

     if(isloading) return <Loader/>
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          </CheckAuth>}/>
        
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="list" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="search" element={<SearchProduct/>}/>
        </Route>
        <Route path="/unauth-page" element={<UnAuthPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </div>
  )
}

export default App
