import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import ActionsReducer from './ActionsReducer';

export default combineReducers({
    user: UserReducer,
    actions: ActionsReducer
})