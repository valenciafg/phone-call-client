import {
    LAST_CALLS, NEW_CALL
} from '../actions';

const initialState = {
    calls: []
};
const calls = (state = initialState, action) => {
    switch(action.type){
        case NEW_CALL:
            console.log('new call', action.call);
            return Object.assign({},state,{
                calls: [
                    ...state.calls,
                    {
                        call: action.call
                    }
                ]
            });
        case LAST_CALLS:
            // console.log('action.payload:',action.payload)
            return Object.assign({},state,{
                calls: action.payload
            });
        default:
            return state;
    }
};

export default calls;
