import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    featureImageList: []
}

export const getFeatureImage = createAsyncThunk(
    "feature/getfeatureImage",
    async () => {

        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/feature/get`
        )

        return result.data

    }


)
export const addFeatureImage = createAsyncThunk(
    "feature/addfeatureImage",
    async (image) => {

        const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/feature/add`, { image }
        )
      
        return result.data

    }


)

export const deleteFeatureImage = createAsyncThunk(
    "feature/deletefeatureImage",
    async (id) => {

        const result = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/shop/feature/delete/${id}`, 
        )
       
        return result.data

    }


)

const FeatureSlice = createSlice({
    name: "FeatureSlice",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getFeatureImage.pending, (state) => {
            state.isLoading = true
        })
            .addCase(getFeatureImage.fulfilled, (state, action) => {
               
                state.isLoading = false;
                state.featureImageList = action.payload.data;
            })
            .addCase(getFeatureImage.rejected, (state, action) => {
                state.isLoading = false;
                state.featureImageList = [];
                console.error("Failed to fetch Searchproducts:", action.error.message);
            })
    }
})


export default FeatureSlice.reducer