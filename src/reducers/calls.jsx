import {
    LAST_CALLS, NEW_CALL, PHONE_DIRECTORY, EXTERNAL_PHONE_DIRECTORY,
    MAKE_EXTERNAL_PHONE, CALLS_BY_EXT, CALLS_BY_DATE, CALLS_BY_NAME
} from '../actions';

const initialState = {
    calls: [],
    phonedirectory: [],
    externalphonedirectory: [],
    callsSearched: [],
    externalphonedefined: {}
};
const calls = (state = initialState, action) => {
    // console.log('**state',state)
    // console.log('**action',action)
    switch(action.type){
        case NEW_CALL:
            return Object.assign({},state,{
                calls: [
                    ...state.calls,
                    {
                        call: action.call
                    }
                ],
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined
            });
        case LAST_CALLS:
            return Object.assign({},state,{
                calls: action.payload,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined
            });
        case PHONE_DIRECTORY:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: action.payload,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined
            })
        case EXTERNAL_PHONE_DIRECTORY:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: action.payload,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined
            })
        case MAKE_EXTERNAL_PHONE:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: action.payload
            })
        case CALLS_BY_EXT:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: action.payload,
                externalphonedefined: state.externalphonedefined
            })
        case CALLS_BY_DATE:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: action.payload,
                externalphonedefined: state.externalphonedefined
            })
        case CALLS_BY_NAME:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: action.payload,
                externalphonedefined: state.externalphonedefined
            })
        default:
            return state;
    }
};

export default calls;
