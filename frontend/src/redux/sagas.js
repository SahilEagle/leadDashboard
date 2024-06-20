import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import {
  // loginRequest,
  loginSuccess,
  loginFailure,
  // signupRequest,
  signupSuccess,
  signupFailure,
  // forgotPasswordRequest,
  // forgotPasswordSuccess,
  // forgotPasswordFailure,
  // changePasswordRequest,
  // changePasswordSuccess,
  // changePasswordFailure,
} from './action';;

function* loginSaga(action) {

  const { payload } = action;

  try {
    const response = yield call(axios.post, `${import.meta.env.VITE_BACKEND_URL}/api/user/login`, payload);

    if (response.status === 200) {
      yield put(loginSuccess(response.data));
    } else {
      yield put(loginFailure('Failed to login')); // Handle other status codes if needed
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* signupSaga(action) {
  try {
    const response = yield call(axios.post, `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`, action.payload);

    if(response.status === 201){
      yield put(signupSuccess(response.data));
    }else{
      yield put(signupFailure("Signup Failed"));
    }
  } catch (error) {
    yield put(signupFailure(error.response.data));
  }
}

// function* forgotPasswordSaga(action) {
//   try {
//     yield call(axios.put, '/api/user/forgot-password', action.payload);
//     yield put(forgotPasswordSuccess());
//   } catch (error) {
//     yield put(forgotPasswordFailure(error.response.data));
//   }
// }

// function* changePasswordSaga(action) {
//   try {
//     yield call(axios.put, '/api/user/change-password', action.payload);
//     yield put(changePasswordSuccess());
//   } catch (error) {
//     yield put(changePasswordFailure(error.response.data));
//   }
// }

function* watchLogin() {
  yield takeLatest('auth/loginRequest', loginSaga);
}

function* watchSignup() {
  yield takeLatest('auth/signupRequest', signupSaga);
}

// function* watchForgotPassword() {
//   yield takeLatest('auth/forgotPasswordRequest', forgotPasswordSaga);
// }

// function* watchChangePassword() {
//   yield takeLatest('auth/changePasswordRequest', changePasswordSaga);
// }

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    // watchForgotPassword(),
    // watchChangePassword(),
  ]);
}
