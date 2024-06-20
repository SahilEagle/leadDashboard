import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // logout(state) {
        //     state.user = null;
        // },
        loginRequest(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.isLoading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        // signupRequest(state) {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // signupSuccess(state) {
        //     state.isLoading = false;
        // },
        // signupFailure(state, action) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
        // forgotPasswordRequest(state) {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // forgotPasswordSuccess(state) {
        //     state.isLoading = false;
        // },
        // forgotPasswordFailure(state, action) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
        // changePasswordRequest(state) {
        //     state.isLoading = true;
        //     state.error = null;
        // },
        // changePasswordSuccess(state) {
        //     state.isLoading = false;
        // },
        // changePasswordFailure(state, action) {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // },
    },
});

export default authSlice.reducer;
export const {
    loginRequest,
    loginSuccess,
    loginFailure,
    // signupRequest,
    // signupSuccess,
    // signupFailure,
    // forgotPasswordRequest,
    // forgotPasswordSuccess,
    // forgotPasswordFailure,
    // changePasswordRequest,
    // changePasswordSuccess,
    // changePasswordFailure,
} = authSlice.actions;
