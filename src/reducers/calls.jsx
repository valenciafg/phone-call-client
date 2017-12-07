import {
    LAST_CALLS, NEW_CALL, PHONE_DIRECTORY, EXTERNAL_PHONE_DIRECTORY,
    MAKE_EXTERNAL_PHONE, CALLS_BY_EXT, CALLS_BY_DATE, CALLS_BY_NAME,
    MORE_CALLED_PHONES, MORE_DURATION_CALLS
} from '../actions';

const initialState = {
    calls: [],
    phonedirectory: [],
    externalphonedirectory: [],
    callsSearched: [],
    externalphonedefined: {},
    moreCalledPhones: [],
    moreDurationCalls: []
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
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            });
        case LAST_CALLS:
            return Object.assign({},state,{
                calls: action.payload,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            });
        case PHONE_DIRECTORY:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: action.payload,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            })
        case EXTERNAL_PHONE_DIRECTORY:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: action.payload,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            })
        case MAKE_EXTERNAL_PHONE:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: action.payload,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            })
        case CALLS_BY_EXT:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: action.payload,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            })
        case CALLS_BY_DATE:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: action.payload,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            })
        case CALLS_BY_NAME:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: action.payload,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: state.moreDurationCalls
            })
        case MORE_CALLED_PHONES:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: action.payload,
                moreDurationCalls: state.moreDurationCalls
            })
        case MORE_DURATION_CALLS:
            return Object.assign({},state,{
                calls: state.calls,
                phonedirectory: state.phonedirectory,
                externalphonedirectory: state.externalphonedirectory,
                callsSearched: state.callsSearched,
                externalphonedefined: state.externalphonedefined,
                moreCalledPhones: state.moreCalledPhones,
                moreDurationCalls: action.payload
            })
        default:
            return state;
    }
};

export default calls;
