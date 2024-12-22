import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/AuthSlice"
import AdminProductsSlice from "../slice/admin/ProductSlice"
import shoppingProducts from "../slice/shop/ProductSlice"
import ShoppingCartSlice from "../slice/cart/Slice"
import AddressDetailsSlice from "../slice/address/Slice"
import SearchInput from "../slice/search/Slice"
import FeatureImageSlice from "../slice/Feature/index"






const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts: shoppingProducts,
        CartSlice: ShoppingCartSlice,
        AddressSlice: AddressDetailsSlice,
        searchProduct: SearchInput,
        FeatureSlice: FeatureImageSlice
    }
})

export default store;