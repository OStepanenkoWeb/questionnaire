import axios from '../../axios/api'
import {FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const { data } = await axios.get('/quizes.json');
            const quizes = [];

            Object.keys(data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест №${index+1}`
                })

            });

            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }

}

export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}
