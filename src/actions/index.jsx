import axios from 'axios'
import Moment from 'moment'
/**
*   Actions types
**/
export const LAST_CALLS = 'LAST_CALLS'
export const NEW_CALL = 'NEW_CALL'
export const CALLS_BY_EXT = 'CALLS_BY_EXT'
export const PHONE_DIRECTORY = 'PHONE_DIRECTORY'

function createCallObject(data){
    let calls = data.map((info)=>{
        // console.log('info dentro de createCallObject',info)
        let callTime = Moment(info.PhoneCallStartTime).format('hh:mm:ss A')
        let callDuration = Moment(info.PhoneCallDuration).format('mm:ss.SS')
        let CallDate = Moment(info.CallDate).format('DD-MM-YYYY')
        let CallDateUnix = Moment(info.CallDate).unix()
        return {
            call: {
                ext: info.PhoneExtension,
                cnn: info.CostCenterName,
                trfSub: info.TrfSub,
                dialedPhone: info.PhoneDestination,
                callTime: callTime,
                callDuration: callDuration,
                cost: info.RegisteredCost,
                pni: info.BusinessCodeNumber,
                commType1: info.CommunicationType,
                commType2: info.CommunicationTypeTwo,
                callType: info.CallType,
                callDate: CallDate,
                callDateUnix: CallDateUnix
            }
        }
    })
    return calls
}
function createPhoneDirectoryObject(data){
    let directory = data.map((info)=>{
        return({
            id: info.ExtensionID,
            phone: info.PhoneNumber,
            name: info.Name,
            area: info.Area,
            location: info.Location
        })
    })
    return directory
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
        // let original_state = getState()
        let apiURL = (process.env.NODE_ENV == 'development'?'/lastcalls/':'http://172.24.10.3:8080/lastcalls/')
        axios.get(apiURL)
        .then((response)=>{
            // console.log('ultimas llamadas',response.data)
            let last_calls = createCallObject(response.data)
            dispatch({
                type: LAST_CALLS,
                // phonedirectory: original_state.phonedirectory,
                payload: last_calls
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}

export function getPhoneDirectory(){
    return(dispatch,getState)=>{
        let original_state = getState()
        let apiURL = (process.env.NODE_ENV == 'development'?'/phonedirectory/':'http://172.24.10.3:8080/phonedirectory/')
        axios.get(apiURL)
        .then((response)=>{
            let phonedirectory = createPhoneDirectoryObject(response.data)
            // console.log('phonedirectory desde action',phonedirectory)
            dispatch({
                type: PHONE_DIRECTORY,
                payload: phonedirectory
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}

export function searchCallsByExtension(ext){
    // console.log('asdasdasd',ext)
    return(dispatch,getState)=>{
        let apiURL = (process.env.NODE_ENV == 'development'?'/call/'+ext:'http://172.24.10.3:8080/call/'+ext)
        // console.log('mi apiURL es',apiURL)
        axios.get(apiURL)
        .then((response)=>{
            // console.log('respuesta',response.data)
            let callsSearched = createCallObject(response.data)
            // console.log('respuesta convertida',callsSearched)
            dispatch({
                type: CALLS_BY_EXT,
                payload: callsSearched
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}
