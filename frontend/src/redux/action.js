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

  FETCH_VISITORS_REQUEST,
  FETCH_VISITORS_SUCCESS,
  FETCH_VISITORS_FAILURE,

  ADD_VISITOR_REQUEST,
  ADD_VISITOR_SUCCESS,
  ADD_VISITOR_FAILURE,

  UPDATE_VISITOR_REQUEST,
  UPDATE_VISITOR_SUCCESS,
  UPDATE_VISITOR_FAILURE,

  DELETE_VISITOR_REQUEST,
  DELETE_VISITOR_SUCCESS,
  DELETE_VISITOR_FAILURE,

  LOGOUT,
  FETCH_SESSION_REQUEST,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from './constants';

export const logoutRequest = () => ({
  type: LOGOUT,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const fetchSessionRequest = () => ({
  type: FETCH_SESSION_REQUEST,
});

export const fetchSessionSuccess = (user) => ({
  type: FETCH_SESSION_SUCCESS,
  payload: user,
});

export const fetchSessionFailure = (error) => ({
  type: FETCH_SESSION_FAILURE,
  payload: error,
});

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

// -----------------------------------visitors actions-------------------------
export const fetchVisitorsRequest = (data) => ({
  type: FETCH_VISITORS_REQUEST,
  payload: data,
});

export const fetchVisitorsSuccess = (visitors) => ({
  type: FETCH_VISITORS_SUCCESS,
  payload: visitors,
});

export const fetchVisitorsFailure = (error) => ({
  type: FETCH_VISITORS_FAILURE,
  payload: error,
});

export const addVisitorRequest = (visitor) => ({
  type: ADD_VISITOR_REQUEST,
  payload: visitor,
});

export const addVisitorSuccess = (visitor) => ({
  type: ADD_VISITOR_SUCCESS,
  payload: visitor,
});

export const addVisitorFailure = (error) => ({
  type: ADD_VISITOR_FAILURE,
  payload: error,
});

export const updateVisitorRequest = (visitor) => ({
  type: UPDATE_VISITOR_REQUEST,
  payload: visitor,
});

export const updateVisitorSuccess = (visitor) => ({
  type: UPDATE_VISITOR_SUCCESS,
  payload: visitor,
});

export const updateVisitorFailure = (error) => ({
  type: UPDATE_VISITOR_FAILURE,
  payload: error,
});

export const deleteVisitorRequest = (visitorId) => ({
  type: DELETE_VISITOR_REQUEST,
  payload: visitorId,
});

export const deleteVisitorSuccess = (visitorId) => ({
  type: DELETE_VISITOR_SUCCESS,
  payload: visitorId,
});

export const deleteVisitorFailure = (error) => ({
  type: DELETE_VISITOR_FAILURE,
  payload: error,
});

// export const fetchVisitorsRequestSearch = (data) => ({
//   type: FETCH_SEARCH_REQUEST,
//   payload: data
// });

// export const fetchVisitorsSuccessSearch = (visitors) => ({
//   type: FETCH_SEARCH_SUCCESS,
//   payload: visitors,
// });

// export const fetchVisitorsFailureSearch = (error) => ({
//   type: FETCH_SEARCH_FAILURE,
//   payload: error,
// });