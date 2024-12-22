import { createAsyncThunk, createSlice }  from "@reduxjs/toolkit"
import axios from "axios"

const initialState ={
    isLoading: false,
    AddressList: [] 
}


export const addAddress = createAsyncThunk(
    "address/addAddress",
    async(formData) => {
        const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/shop/address/addAddress`, formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        return result.data
    }
)


export const fetchAddress = createAsyncThunk(
    "address/fetchAddress",
    async(userId) => {
        const result = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/shop/address/get/${userId}`
            
        )
       
        return result.data
    }
    
)


export const editAddress = createAsyncThunk(
    "address/editAddress",
    async({userId, addressId,formData}) => {
        const result = await axios.put(
            `${import.meta.env.VITE_API_URL}/api/shop/address/edit/${userId}/${addressId}`, formData
        )
        return result.data
    }
)

export const deleteAddress = createAsyncThunk(
    "address/deleteAddress",
    async({userId,addressId}) => {
        const result = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/shop/address/delete/${userId}/${addressId}`
            
        )
        return result.data
    }
)

const AddressDetailsSlice = createSlice({
    name: "AddressDetails",
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(addAddress.pending, (state) => {
            state.isLoading = true
        })
            .addCase(addAddress.fulfilled, (state, action) => {
                state.isLoading = false
                   
            })
            .addCase(addAddress.rejected, (state, action) => {
                state.isLoading = false
                    
            }).addCase(fetchAddress.pending, (state) => {
                state.isLoading = true
            })
                .addCase(fetchAddress.fulfilled, (state, action) => {
                    state.isLoading = false,
                        state.AddressList = action.payload.data
                })
                .addCase(fetchAddress.rejected, (state, action) => {
                    state.isLoading = false,
                        state.AddressList = []
                })
    }

})

export default AddressDetailsSlice.reducer