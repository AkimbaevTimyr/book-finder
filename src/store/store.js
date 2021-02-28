
import { combineReducers, createStore } from 'redux'

import BookReducer from '../reducers/book'

let reducers = combineReducers({
    book: BookReducer
})



const store = createStore(reducers)



export default store