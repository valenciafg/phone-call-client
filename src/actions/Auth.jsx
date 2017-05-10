import axios from 'axios'

export const SET_FORM_DATA = 'SET_FORM_DATA';
export const LOGIN_USER = 'LOGIN_USER';
export const FORM_STATE = 'FORM_STATE';
export const LOGOUT_USER = 'LOGOUT_USER';
const MAIN_HOST = (process.env.NODE_ENV == 'development'?'http://localhost:8081/':'http://172.24.10.3:8081/')

export function setFormLoading(value = true){
    return (dispatch, getState)=>{
        dispatch({
            type: FORM_STATE,
            payload: {
                isLoading: value,
                error: false,
                message: ''
            }
        })
    }
}

export function signIn(data){
    const { username, password } = data;
    return(dispatch,getState)=>{
        // let original_state = getState()        
        let apiURL = (process.env.NODE_ENV == 'development'?'/authuser/':MAIN_HOST+'authuser/')
        //console.log('mi api url es ',apiURL)
        axios.post(apiURL,{
            user: username,
            password
        })
        .then((response)=>{
            const data = response.data;
            console.log('respuesta desde signIn',response.data);
            let reserror = response.data.error;
            dispatch({
                type: LOGIN_USER,
                payload: {
                    loggedin: !data.error,
                    form: {
                        isLoading: false,
                        error: data.error,
                        message: data.message
                    }
                }
            });
        })
        .catch((error)=>{
            console.log('Error',error)
        })
    }
}

export function logoutUser(){
    return ( dispatch, getState ) => {
        dispatch({
            type: LOGOUT_USER,
            payload: {
                loggedin: false,
                form: {
                    isLoading: false,
                    error: false,
                    message: ''
                }
            }
        })
    }
}