import { TEST_DISPTACH } from '../actions/types'

const initialState = {
    isAuthenticated: false,
    user: {}
}


export default function(state = initialState, action){
    switch(action.type){
        case TEST_DISPTACH:
            return {
                ...state,
                user: action.payload
            }
        default:   
            return state   
    }
}