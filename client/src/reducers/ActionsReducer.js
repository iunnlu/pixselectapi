import { CREATE_ACTİON } from '../actions/types';

export default (state=[], action) => {
    switch(action.type){
        case CREATE_ACTİON:
            return [...state, action.payload]
        default: return state;
    }
}