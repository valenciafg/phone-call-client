import axios from 'axios'
/**
*   Actions types
**/
export const LAST_CALLS = 'LAST_CALLS'
export const NEW_CALL = 'NEW_CALL'

function createCallObject(data){
    let calls = data.map((info)=>{
        return {
            call: {
                ext: info.PhoneExtension,
                cnn: info.CostCenterName,
                trfSub: info.TrfSub,
                dialedPhone: info.PhoneDestination,
                callTime: info.PhoneCallStartTime,
                callDuration: info.PhoneCallDuration,
                cost: info.RegisteredCost,
                pni: info.BusinessCodeNumber,
                commType1: info.CommunicationType,
                commType2: info.CommunicationTypeTwo,
                callType: info.CallType
            }
        }
    })
    return calls
}

export function getCalls(){
    return(dispatch,getState)=>{
        let original_state = getState()
        console.log(original_state)
        dispatch({
            calls:original_state.calls
        })
    }
}

export function getLastCalls(){
    return(dispatch,getState)=>{
        let apiURL = '/lastcalls'
        axios.get(apiURL)
        .then((response)=>{
            let last_calls = createCallObject(response.data)
            dispatch({
                type: LAST_CALLS,
                payload: last_calls
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}
