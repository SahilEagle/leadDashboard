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

export const signupRequest = (userData) => ({
  type: SIGNUP_REQUEST,
  payload: userData,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const sendEmail = (payload) => ({
  type: SEND_EMAIL_REQUEST,
  payload,
});

export const sendEmailSuccess = (message) => ({
  type: SEND_EMAIL_SUCCESS,
  payload: message,
});

export const sendEmailFailure = (error) => ({
  type: SEND_EMAIL_FAILURE,
  payload: error,
});

export const verifyOtp = (payload) => ({
  type: VERIFY_OTP,
  payload,
});

export const verifyOtpSuccess = (message) => ({
  type: VERIFY_OTP_SUCCESS,
  payload: message,
});

export const verifyOtpFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const changePassword = (payload) => ({
  type: CHANGE_PASSWORD,
  payload,
});

export const changePasswordSuccess = (message) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: message,
});

export const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error,
});
