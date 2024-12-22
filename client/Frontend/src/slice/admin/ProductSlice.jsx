import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    ProductList: []
}

export const addProducts = createAsyncThunk(
    "/products/addProducts",
    async (formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/admin/products/add`, formData, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        )
        return result.data
    }

)

export const getProducts = createAsyncThunk(
    "/products/getProducts",
    async () => {
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/admin/products/fetch`
        )

        return result?.data?.getProduct;
    }
)

export const editProducts = createAsyncThunk(
    "/products/editProducts",
    async ({id, formData}) => {
        const result = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/admin/products/edit/${id}`, formData, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        )
        return result?.data;
    }
)

export const deleteProducts = createAsyncThunk(
    "/products/deleteProducts",
    async (id) => {
        const result = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/admin/products/delete/${id}`

        )
        return result?.data;
    }
)

const AdminProductsSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false,
                    state.ProductList = action.payload
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false,
                    state.ProductList = []
            })
    },
});

export default AdminProductsSlice.reducer