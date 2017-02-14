import {
    LAST_CALLS, NEW_CALL, PHONE_DIRECTORY
} from '../actions';

const initialState = {
    calls: [],
    phonedirectory: []
};
const calls = (state = initialState, action) => {
    // console.log('**state',state)
    // console.log('**action',action)
    switch(action.type){
        case NEW_CALL:
            // console.log('new call', action.call);
            // console.log('directory', action.phonedirectory);
            return Object.assign({},state,{
                calls: [
                    ...state.calls,
                    {
                        call: action.call
                    }
                ],
                phonedirectory: state.phonedirectory
            });
        case LAST_CALLS:
            // console.log('action.payload:',action.payload)
            /*console.log('LAST_CALLS estoy regresando',Object.assign({},state,{
                calls: action.calls,
                phonedirectory: state.phonedirectory
            }))*/
            return Object.assign({},state,{
                calls: action.calls,
                phonedirectory: action.phonedirectory
            });
        case PHONE_DIRECTORY:
            /*console.log('PHONE_DIRECTORY estoy regresando',Object.assign({},state,{
                calls: state.calls,
                phonedirectory: action.payload
            }))*/
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: action.payload
            })
        default:
            return state;
    }
};

export default calls;
