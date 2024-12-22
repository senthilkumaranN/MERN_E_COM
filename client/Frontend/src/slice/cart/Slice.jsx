import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    cartitems: [],
    isLoading: false
}


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
            {
                userId,
                productId,
                quantity,
            }
        );
        
        return response.data
    }
)


export const UpdateToCart = createAsyncThunk(
    "cart/UpdateToCart",
    async ({ userId, productId, quantity }) => {
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/updatecart`,
            {
                userId,
                productId,
                quantity,
            }
        );

        return response.data
    }
)


export const fetchToCart = createAsyncThunk(
    "cart/fetchToCart",
    async (userId) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`,
        );
         
        
        return response.data
    }
)


export const deleteToCart = createAsyncThunk(
    "cart/deleteToCart",
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`
            );
            return response.data; 
        } catch (error) {
            console.error("Error deleting cart item:", error);
            return rejectWithValue(
                error.response && error.response.data
                    ? error.response.data.message
                    : "An error occurred"
            );
        }
    }
);

const ShoppingCartSlice = createSlice({
    name: "CartSlice",
    initialState,
    reducer: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isloading = true
        })
            .addCase(addToCart.fulfilled, (state, action) => {

                state.isloading = false;
                state.cartitems = action.payload.data
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isloading = false;
                state.cartitems = []

            })
        builder.addCase(UpdateToCart.pending, (state) => {
            state.isloading = true
        })
            .addCase(UpdateToCart.fulfilled, (state, action) => {

                state.isloading = false;
                state.cartitems = action.payload.data
            })
            .addCase(UpdateToCart.rejected, (state, action) => {
                state.isloading = false;
                state.cartitems = []

            })
        builder.addCase(fetchToCart.pending, (state) => {
            state.isloading = true
        })
            .addCase(fetchToCart.fulfilled, (state, action) => {

                state.isloading = false;
                state.cartitems = action.payload.data
            })
            .addCase(fetchToCart.rejected, (state, action) => {
                state.isloading = false;
                state.cartitems = []

            })
        builder.addCase(deleteToCart.pending, (state) => {
            state.isloading = true
        })
            .addCase(deleteToCart.fulfilled, (state, action) => {

                state.isloading = false;
                state.cartitems = action?.payload?.data
            })
            .addCase(deleteToCart.rejected, (state, action) => {
                state.isloading = false;
                state.cartitems = []

            })


    }

})

export default ShoppingCartSlice.reducer