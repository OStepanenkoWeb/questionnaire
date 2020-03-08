import {combineReducers} from 'redux';
import quizReducer from '../reducers/quiz'
import {createQuizReducer} from "./create"

export  default combineReducers({
    quiz: quizReducer,
    create: createQuizReducer
})
