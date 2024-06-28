import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-hot-toast';
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
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FETCH_SESSION_SUCCESS,
  FETCH_SESSION_FAILURE
} from './constants';
import { watchFetchSaga, watchAddVisSaga, watchDeleteSaga, watchUpdateSaga } from './visitorSaga.js';
import { fetchSessionFailure } from './action.js';

function* fetchSessionSaga() {
  try {
    const response = yield call(fetch, `${import.meta.env.VITE_BACKEND_URL}/auth/check-session`, { credentials: 'include' });
    const data = yield response.json();
    console.log(data.isAuthenticated);
    if (data.isAuthenticated) {
      yield put({type:FETCH_SESSION_SUCCESS, payload: response.data.user});
    } else {
      yield put({type: FETCH_SESSION_FAILURE, payload: "Fetching error..."});
    }
  } catch (error) {
    yield put(fetchSessionFailure(error.message));
  }
}

export function* watchFetchSession() {
  yield takeLatest(FETCH_SESSION_REQUEST, fetchSessionSaga);
}

function* logoutSaga() {
  try {
    const response = yield call(axios.get, `${import.meta.env.VITE_BACKEND_URL}/logout`);
    if (response.status === 200) {
      yield put({ type: LOGOUT_SUCCESS });
      window.location.href = "/login"; // Redirect to login page after logout
    } else {
      yield put({ type: LOGOUT_FAILURE, payload: "Failed to logout" });
      toast.error("Failed to logout");
    }
  } catch (error) {
    yield put({ type: LOGOUT_FAILURE, payload: error.message });
    toast.error("Failed to logout");
  }
}

export function* watchLogout() {
  yield takeLatest(LOGOUT, logoutSaga);
}

function* loginSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(axios.post, `${import.meta.env.VITE_BACKEND_URL}/api/user/login`, payload);
    if (response.status === 200) {
      yield put({ type: LOGIN_SUCCESS, payload: response.data });
      toast.success('Login successful');
    } else {
      yield put({ type: LOGIN_FAILURE, payload: 'Failed to login' });
      toast.error('Failed to login');
    }
  } catch (error) {
    yield put({ type: LOGIN_FAILURE, payload: error.response.data.message });
    toast.error(`Login failed: ${error.response.data.message}`);
  }
}

function* signupSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(axios.post, `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, payload);
    if (response.status === 201) {
      yield put({ type: SIGNUP_SUCCESS, payload: response.data });
      toast.success('Signup successful');
    } else {
      yield put({ type: SIGNUP_FAILURE, payload: 'Signup failed' });
      toast.error('Signup failed');
    }
  } catch (error) {
    const errorMessage = error.response && error.response.data ? error.response.data.message : error.message;
    yield put({ type: SIGNUP_FAILURE, payload: errorMessage });
    toast.error(errorMessage);
  }
}

function* sendEmailSaga(action) {
  const { payload } = action;
  try {
    toast.loading("Checking your Email...", { id: 'check' })
    const response = yield call(axios.put, `${import.meta.env.VITE_BACKEND_URL}/api/user/send-email`, payload);
    if (response.status === 200) {
      yield put({ type: SEND_EMAIL_SUCCESS, payload: response.data.message });
      toast.success('Email sent successfully', { id: 'check' });
    } else {
      yield put({ type: SEND_EMAIL_FAILURE, payload: 'Failed to send email' });
      toast.error('Failed to send email', { id: 'check' });
    }
  } catch (error) {
    yield put({ type: SEND_EMAIL_FAILURE, payload: error.response.data.message });
    toast.error(error.response.data.error, { id: 'check' });
  }
}

function* verifyOtpSaga(action) {
  const { payload } = action;
  try {
    const response = yield call(axios.put, `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-otp`, payload);
    if (response.status === 200) {
      yield put({ type: VERIFY_OTP_SUCCESS, payload: response.data.message });
      toast.success('OTP verified successfully');
    } else {
      yield put({ type: VERIFY_OTP_FAILURE, payload: 'Failed to verify OTP' });
      toast.error('Failed to verify OTP');
    }
  } catch (error) {
    yield put({ type: VERIFY_OTP_FAILURE, payload: error.response.data.message });
    toast.error(`Failed to verify OTP: ${error.response.data.message}`);
  }
}

function* changePasswordSaga(action) {
  const { email, otp, newPassword, confirmPassword } = action.payload;
  try {
    const response = yield call(axios.put, `${import.meta.env.VITE_BACKEND_URL}/api/user/change-password`, {
      email,
      otp,
      newPassword,
      confirmPassword
    });

    if (response && response.status === 200) {
      yield put({ type: CHANGE_PASSWORD_SUCCESS, payload: response.data.message });
      toast.success('Password changed successfully');
    } else {
      yield put({ type: CHANGE_PASSWORD_FAILURE, payload: "Failed to change password" });
      toast.error('Failed to change password, please try again later');
    }

  } catch (error) {
    // Log the error to console for debugging
    console.error('Change password error:', error);

    // Update your error handling based on the actual error object structure
    const errorMessage = error.response ? error.response.data.message : 'Unknown error occurred';
    yield put({ type: CHANGE_PASSWORD_FAILURE, payload: errorMessage });
    toast.error(`Failed to change password: ${errorMessage}`);
  }
}

function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}

function* watchSendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST, sendEmailSaga);
}

function* watchVerifyOtp() {
  yield takeLatest(VERIFY_OTP, verifyOtpSaga);
}

function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD, changePasswordSaga);
}

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchSendEmail(),
    watchVerifyOtp(),
    watchChangePassword(),

    watchFetchSession(),
    watchLogout(),

    watchAddVisSaga(),
    watchDeleteSaga(),
    watchFetchSaga(),
    watchUpdateSaga(),
    // watchLogout(),
  ]);
}
