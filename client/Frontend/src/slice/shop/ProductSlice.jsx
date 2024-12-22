import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    ProductList: [],
    productDetails: null
}

export const getFilterProducts = createAsyncThunk(
    "products/getFilterProducts",
    async ({ filterParams, sortParams }) => {

        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams,
        })
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
        )

        return result.data
    }
)

export const getProductDetails = createAsyncThunk(
    "products/getProductDetails",
    async (id) => {
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
        )
        
        return result.data
    }

)


const ShopProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
        setProductDetails: (state,action) => {
            state.productDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFilterProducts.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getFilterProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.ProductList = action.payload.data;
            })
            .addCase(getFilterProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.ProductList = [];
                console.error("Failed to fetch products:", action.error.message);
            }).addCase(getProductDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                 state.isLoading = false;
                state.productDetails = action.payload.Product;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = null;
                console.error("Failed to fetch productDetails:", action.error.message);
            })
    },
})


export  const { setProductDetails } = ShopProductSlice.actions
export default ShopProductSlice.reducer