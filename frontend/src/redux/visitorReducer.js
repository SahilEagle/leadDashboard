// Import your constants and set initial state
import * as constants from './constants';

const initialState = {
    visitors: [],
    loading: false,
    error: null,
};

// Define your visitor reducer function
const visitorReducer = (state = initialState, action) => {
    switch (action.type) {
        case constants.FETCH_VISITORS_REQUEST:
        case constants.ADD_VISITOR_REQUEST:
        case constants.UPDATE_VISITOR_REQUEST:
        case constants.DELETE_VISITOR_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case constants.FETCH_VISITORS_SUCCESS:
            return {
                ...state,
                loading: false,
                visitors: action.payload, // Update visitors directly
                error:null,
            };
        case constants.ADD_VISITOR_SUCCESS:
            return {
                ...state,
                loading: false,
                visitors: [action.payload, ...state.visitors], // Add visitor to the beginning of the array
                error:null,
            };
        case constants.UPDATE_VISITOR_SUCCESS:
            return {
                ...state,
                loading: false,
                visitors: state.visitors.map((visitor) =>
                    visitor._id === action.payload._id ? action.payload : visitor
                ),
                error:null,
            };
        case constants.DELETE_VISITOR_SUCCESS:
            return {
                ...state,
                loading: false,
                visitors: state.visitors.filter((visitor) => visitor._id !== action.payload),
                error:null,
            };
        case constants.FETCH_VISITORS_FAILURE:
        case constants.ADD_VISITOR_FAILURE:
        case constants.UPDATE_VISITOR_FAILURE:
        case constants.DELETE_VISITOR_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default visitorReducer;
