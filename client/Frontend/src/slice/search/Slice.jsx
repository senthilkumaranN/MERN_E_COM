import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    searchList: []
}

export const fetchSearchProduct = createAsyncThunk(
    "search/fetchSearchProduct",
    async (keyword) => {

        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/products/search/${keyword}`
        )
        
        return result.data
      
    }

   
)

const SearchSlice = createSlice({
    name: "searchProduct",
    initialState,
    reducers: {
        resetSearchList: (state) =>{
            state.searchList = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchProduct.pending, (state) => {
            state.isLoading = true
        })
            .addCase(fetchSearchProduct.fulfilled, (state, action) => {
               
                state.isLoading = false;
                state.searchList = action.payload.data;
            })
            .addCase(fetchSearchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.searchList = [];
                console.error("Failed to fetch Searchproducts:", action.error.message);
            })
    }
})

export const {resetSearchList} = SearchSlice.actions
export default SearchSlice.reducer