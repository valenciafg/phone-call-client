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
export const EXTERNAL_PHONE_DIRECTORY = 'EXTERNAL_PHONE_DIRECTORY'
export const MAKE_EXTERNAL_PHONE = 'MAKE_EXTERNAL_PHONE'
export const MAIN_HOST = (process.env.NODE_ENV == 'development'?'http://localhost:8081/':'http://172.24.10.3:8081/')
function timeToString(dateFormat){
    if(typeof(dateFormat) != 'undefined'){
        let newTime = dateFormat.substr(dateFormat.indexOf('T')+1)
        newTime = newTime.substr(0, newTime.indexOf('.'))
        return newTime
    }else{
        return ''
    }
}
function createCallObject(data){
    let calls = data.map((info)=>{
        // console.log('info dentro de createCallObject',typeof(info.MyExtPhoneName) != 'undefined')
        const extName = (typeof(info.MyExtPhoneName) != 'undefined' ? info.MyExtPhoneName : '')
        let callTime = timeToString(info.MyStartTime)
        let callDuration = Moment(info.PhoneCallDuration).format('mm:ss')
        let callDate = Moment(info.CallDate).format('DD-MM-YYYY')
        let callDateUnix = Moment(info.CallDate).unix()
        let dialedPhoneName = info.DestinationName == null ? '' : info.DestinationName
        return {
            call: {
                ext: info.PhoneExtension,
                extName,
                cnn: info.CostCenterName,
                trfSub: info.TrfSub,
                dialedPhone: info.PhoneDestination,
                dialedPhoneName,
                callTime,
                callDuration,
                cost: info.RegisteredCost,
                pni: info.BusinessCodeNumber,
                commType1: info.CommunicationType,
                commType2: info.CommunicationTypeTwo,
                callType: info.CallType,
                callDate,
                callDateUnix
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
        // console.log('getCalls action', original_state)
        dispatch({
            calls:original_state.calls
        })
    }
}

export function getLastCalls(){
    return(dispatch, getState)=>{
        // let original_state = getState()        
        let apiURL = (process.env.NODE_ENV == 'development'?'/lastcalls/':MAIN_HOST+'lastcalls/')
        //console.log('mi api url es ',apiURL)
        axios.get(apiURL)
        .then((response)=>{
            // console.log('ultimas llamadas',response.data)
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

export function getPhoneDirectory(){
    return(dispatch,getState)=>{
        let original_state = getState()
        let apiURL = (process.env.NODE_ENV == 'development'?'/phonedirectory/':MAIN_HOST+'phonedirectory/')
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
export function getExternalPhoneDirectory(){
    return(dispatch,getState)=>{
        let original_state = getState()
        let apiURL = (process.env.NODE_ENV == 'development'?'/externalphonedirectory/':MAIN_HOST+'externalphonedirectory/')
        axios.get(apiURL)
        .then((response)=>{
            let phonedirectory = createPhoneDirectoryObject(response.data)
            dispatch({
                type: EXTERNAL_PHONE_DIRECTORY,
                payload: phonedirectory
            })
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}

export function searchCallsByExtension(ext){
    return(dispatch,getState)=>{
        let apiURL = (process.env.NODE_ENV == 'development'?'/call/':MAIN_HOST+'call/')
        axios.post(apiURL,{
            ext: ext
        })
        .then((response)=>{
            console.log('my resp', response.data)
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
export function searchExternalCallsByName(ext_id){
    return(dispatch,getState)=>{
        let apiURL = (process.env.NODE_ENV == 'development'?'/searchexternalcall/':MAIN_HOST+'searchexternalcall/')
        axios.post(apiURL,{
            ext_id
        })
        .then((response)=>{
            let callsSearched = createCallObject(response.data)
            // console.log('my respxx', callsSearched) 
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
            let callsSearched = createCallObject(response.data.records)
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

export function makeExternalPhone(number, name){
    let newData = {
        number,
        name
    }
    // console.log('voy a enviar', newData)
    let apiURL = (process.env.NODE_ENV == 'development'?'/makeexternalphone/':MAIN_HOST+'makeexternalphone/')
    axios.post(apiURL,newData)
    .then((response)=>{
        console.log('respuesta',response.data)
        /*dispatch({
            type: MAKE_EXTERNAL_PHONE,
            payload: response.data
        })*/
    })
    .catch((error)=>{
        console.log('Error',error)
    })
}