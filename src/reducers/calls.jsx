import {
    LAST_CALLS, NEW_CALL, PHONE_DIRECTORY,
    CALLS_BY_EXT
} from '../actions';

const initialState = {
    calls: [],
    phonedirectory: [],
    callsSearched: []
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
                phonedirectory: state.phonedirectory,
                callsSearched: state.callsSearched
            });
        case LAST_CALLS:
            // console.log('action.payload:',action.payload)
            /*console.log('LAST_CALLS estoy regresando',Object.assign({},state,{
                calls: action.calls,
                phonedirectory: state.phonedirectory
            }))*/
            return Object.assign({},state,{
                calls: action.payload,
                phonedirectory: state.phonedirectory,
                callsSearched: state.callsSearched
            });
        case PHONE_DIRECTORY:
            /*console.log('PHONE_DIRECTORY estoy regresando',Object.assign({},state,{
                calls: state.calls,
                phonedirectory: action.payload
            }))*/
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: action.payload,
                callsSearched: state.callsSearched
            })
        case CALLS_BY_EXT:
            console.log('CALLS_BY_EXT',Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                callsSearched: action.payload,
            }))
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                callsSearched: action.payload,
            })
        default:
            return state;
    }
};

export default calls;
