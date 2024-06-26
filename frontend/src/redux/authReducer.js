import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    SEND_EMAIL_REQUEST,
    SEND_EMAIL_SUCCESS,
    SEND_EMAIL_FAILURE,
    VERIFY_OTP,
    VERIFY_OTP_SUCCESS,
    VERIFY_OTP_FAILURE,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
    FETCH_SESSION_REQUEST,
    FETCH_SESSION_SUCCESS,
    FETCH_SESSION_FAILURE,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
} from './constants';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    emailSent: false,
    otpVerified: false,
    passwordChanged: false,
    isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case SEND_EMAIL_REQUEST:
        case VERIFY_OTP:
        case FETCH_SESSION_REQUEST:
        case LOGOUT:
        case CHANGE_PASSWORD:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case FETCH_SESSION_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                isAuthenticated: true,
            };
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
        case SEND_EMAIL_FAILURE:
        case FETCH_SESSION_FAILURE:
        case LOGOUT_FAILURE:
        case VERIFY_OTP_FAILURE:
        case CHANGE_PASSWORD_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case SEND_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                emailSent: true,
            };
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                otpVerified: true,
            };
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                passwordChanged: true,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            }
        default:
            return state;
    }
};

export default authReducer;
