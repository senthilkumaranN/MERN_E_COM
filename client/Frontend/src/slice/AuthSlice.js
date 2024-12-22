import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isloading: true,
    user: null,
    token: null
}

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/register`,
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            );
        }
    }
);


export const LoginUser = createAsyncThunk(
    '/auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/login`,
                formData,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const LogoutUser = createAsyncThunk(
    '/auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/logout`,{},
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Logout failed'
            );
        }
    }
);
// export const checkAuth = createAsyncThunk(
//     '/auth/checkauth',
//     async (_,{ rejectWithValue }) => {
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_URL}/api/checkauth`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         'Cache-Control': 'no-store,no-cache,must-revalidate, proxy-revalidate'
//                     }
//                 }
//             );
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(
//                 error.response?.data?.message || 'Unauthorized user!'
//             );
//         }
//     }
// );


export const checkAuth = createAsyncThunk(
        '/auth/checkauth',
        async (token,{ rejectWithValue }) => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/checkauth`,
                    {
                        withCredentials: true,
                        headers: {
                            Authorization : `Bearer ${token}`,
                            'Cache-Control': 'no-store,no-cache,must-revalidate, proxy-revalidate'
                        }
                    }
                );
                return response.data;
            } catch (error) {
                return rejectWithValue(
                    error.response?.data?.message || 'Unauthorized user!'
                );
            }
        }
    );

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => { },
        resetTokenAndCredentials : (state)=> {
            state.isAuthenticated = false;
            state.user = null
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isloading = true
        })
            .addCase(registerUser.fulfilled, (state, action) => {

                state.isloading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isloading = false;
                state.user = null;
                state.isAuthenticated = false;

            })
        builder.addCase(LoginUser.pending, (state) => {
            state.isloading = true
        })
            .addCase(LoginUser.fulfilled, (state, action) => {

                state.isloading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                state.token = action.payload.token
                sessionStorage.setItem('token', JSON.stringify(action.payload.token))
            })
            .addCase(LoginUser.rejected, (state, action) => {

                state.isloading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.token = null
            })
        builder.addCase(checkAuth.pending, (state) => {
            state.isloading = true
        })
            .addCase(checkAuth.fulfilled, (state, action) => {

                state.isloading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {

                state.isloading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(LogoutUser.fulfilled, (state, action) => {

                state.isloading = false;
                state.user =  null;
                state.isAuthenticated = false;
            })
    }
})

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer