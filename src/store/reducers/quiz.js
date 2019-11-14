import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZES_ERROR } from "../actions/actionTypes"


const initialState = {
    quizes : [],
    loading: true,
    error:null,
}

export default function quizReducer (state = initialState, action) {
    switch(action.type) {
        case FETCH_QUIZES_START : 
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS : 
            return {
                ...state, 
                quizes: action.quizes, 
                loading: false,
            } 
        case FETCH_QUIZES_ERROR : 
            return {
                ...state, 
                loading: false,
                error: action.error,
            } 
        default: 
            return state
    }
}

