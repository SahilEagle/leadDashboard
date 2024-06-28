// Import necessary dependencies
import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import * as constants from './constants';
import * as actions from './action.js';
import { toast } from 'react-hot-toast';

// Fetch visitors saga
function* fetchVisitorsSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost:5000/api/visitors');
        yield put(actions.fetchVisitorsSuccess(response.data));
    } catch (error) {
        yield put(actions.fetchVisitorsFailure(error.message));
        toast.error(`Failed to fetch visitors: ${error.message}`);
    }
}

// function* fetchVisitorSearchSaga(action) {
//     console.log(action.payload);
//     try {
//         const response = yield call(axios.get, `http://localhost:5000/api/visitors/search/${action.payload}`);
//         yield put(actions.fetchVisitorsSuccessSearch(response.data));
//         toast.success("visitors loaded");
//     } catch (error) {
//         yield put(actions.fetchVisitorsFailureSearch(error.message));
//         toast.error("Failed to fetch visitors")
//     }
// }

// Add visitor saga
function* addVisitorSaga(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:5000/api/visitors', action.payload);
        yield put(actions.addVisitorSuccess(response.data));
        toast.success('Visitor added successfully');
    } catch (error) {
        yield put(actions.addVisitorFailure(error.message));
        toast.error(`Failed to add visitor: ${error.message}`);
    }
}

// Update visitor saga
function* updateVisitorSaga(action) {
    try {
        const response = yield call(axios.patch, `http://localhost:5000/api/visitors/${action.payload._id}`, action.payload);
        yield put(actions.updateVisitorSuccess(response.data));
        toast.success('Visitor updated successfully');
    } catch (error) {
        yield put(actions.updateVisitorFailure(error.message));
        toast.error(`Failed to update visitor: ${error.message}`);
    }
}

// Delete visitor saga
function* deleteVisitorSaga(action) {
    try {
        const response = yield call(axios.delete, `http://localhost:5000/api/visitors/${action.payload}`, action.payload);
        yield put(actions.deleteVisitorSuccess(action.payload));
        toast.success('Visitor deleted successfully');
    } catch (error) {
        yield put(actions.deleteVisitorFailure(error.message));
        toast.error(`Failed to delete visitor: ${error.message}`);
    }
}

// Watchers for sagas
function* watchFetchSaga() {
    yield takeLatest(constants.FETCH_VISITORS_REQUEST, fetchVisitorsSaga);
}

// function* watchFetchSearchSaga(){
//     yield takeLatest(constants.FETCH_SEARCH_REQUEST, fetchVisitorSearchSaga);
// }

function* watchAddVisSaga() {
    yield takeLatest(constants.ADD_VISITOR_REQUEST, addVisitorSaga);
}

function* watchUpdateSaga() {
    yield takeLatest(constants.UPDATE_VISITOR_REQUEST, updateVisitorSaga);
}

function* watchDeleteSaga() {
    yield takeLatest(constants.DELETE_VISITOR_REQUEST, deleteVisitorSaga);
}

// Export watchers
export {
    watchFetchSaga,
    // watchFetchSearchSaga,
    watchAddVisSaga,
    watchUpdateSaga,
    watchDeleteSaga
};
