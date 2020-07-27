import { combineReducers } from 'redux-immutable'
import { reducer as msgReducer } from '../application/chat/store/index'

export default combineReducers({
    message: msgReducer,
})