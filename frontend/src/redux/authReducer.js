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
} from './constants';

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    emailSent: false,
    otpVerified: false,
    passwordChanged: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case SEND_EMAIL_REQUEST:
        case VERIFY_OTP:
        case CHANGE_PASSWORD:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN_FAILURE:
        case SIGNUP_FAILURE:
        case SEND_EMAIL_FAILURE:
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
        default:
            return state;
    }
};

export default authReducer;
