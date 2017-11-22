import { LOGIN_USER, LOGOUT_USER, FORM_STATE } from '../actions/Auth';
const initialState = {
    loggedin: false,
    form: {        
        isLoading: false,
        error: false,
        message: ''
    }
};

const auth = (state = initialState, action) => {
  switch(action.type){
    case LOGIN_USER:
    //  console.log('mi payload es',action.payload);
      return Object.assign({},state,{
          loggedin: action.payload.loggedin,
          form: action.payload.form
      });
    case LOGOUT_USER:
        return Object.assign({}, state, action.payload);
    case FORM_STATE:
        return Object.assign({}, state, {
            loggedin: state.loggedin,
            form: action.payload
        });
    default:
      return state;
  }
}
export default auth;