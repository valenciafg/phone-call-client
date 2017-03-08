import axios from 'axios'
import Moment from 'moment'
/**
*   Actions types
**/
export const LAST_CALLS = 'LAST_CALLS'
export const NEW_CALL = 'NEW_CALL'
export const CALLS_BY_EXT = 'CALLS_BY_EXT'
export const CALLS_BY_DATE = 'CALLS_BY_DATE'
export const CALLS_BY_NAME = 'CALLS_BY_NAME'
export const PHONE_DIRECTORY = 'PHONE_DIRECTORY'
export const MAIN_HOST = 'http://172.24.10.3:8081/'
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
        let apiURL = (process.env.NODE_ENV == 'development'?'/lastcalls/':MAIN_HOST+'lastcalls/')
        //console.log('mi api url es ',apiURL)
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
        let apiURL = (process.env.NODE_ENV == 'development'?'/phonedirectory/':MAIN_HOST+'phonedirectory/')
        //console.log('entro por aqui ',apiURL)
        axios.get(apiURL)
        .then((response)=>{
            let phonedirectory = createPhoneDirectoryObject(response.data)
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
        let apiURL = (process.env.NODE_ENV == 'development'?'/call/':MAIN_HOST+'/call/')
        axios.post(apiURL,{
            ext: ext
        })
        .then((response)=>{
            let callsSearched = createCallObject(response.data)
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

export function searchCallsByName(name){
    return(dispatch,getState)=>{
        let apiURL = (process.env.NODE_ENV == 'development'?'/calls/':MAIN_HOST+'calls/')
        axios.post(apiURL,{
            name: name
        })
        .then((response)=>{
            console.log('mi data es',response.data)
            let callsSearched = createCallObject(response.data.records)
            // console.log('respuesta convertida',callsSearched)
            dispatch({
                type: CALLS_BY_NAME,
                payload: callsSearched
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}

export function searchCallsByDate(start, end){
    return(dispatch,getState)=>{
        if(end == '')
            end = Moment().format()
        if(start == '')
            start = Moment().format()
        let apiURL = (process.env.NODE_ENV == 'development'?'/scpost/':MAIN_HOST+'scpost/')
        axios.post(apiURL,{
            start: start,
            end: end
        })
        .then((response)=>{
            //console.log('respuesta',response.data)
            let callsSearched = []
            if(!response.data.error){
                callsSearched = createCallObject(response.data.records)
            }
            //console.log('respuesta convertida',callsSearched)
            dispatch({
                type: CALLS_BY_DATE,
                payload: callsSearched
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}

export function editPhone(data){
    let newData = {
        extensionID: data.id,
        phoneNumber: data.phone,
        name: data.name,
        area: data.area,
        location: data.location
    }
    let apiURL = (process.env.NODE_ENV == 'development'?'/updatephone/':MAIN_HOST+'updatephone/')
        axios.post(apiURL,newData)
        .then((response)=>{
            console.log('respuesta',response.data)
            /*let callsSearched = []
            if(!response.data.error){
                callsSearched = createCallObject(response.data.records)
            }
            console.log('respuesta convertida',callsSearched)
            dispatch({
                type: CALLS_BY_DATE,
                payload: callsSearched
        })*/
        })
        .catch((error)=>{
            console.log('Error',error)
        })
}
