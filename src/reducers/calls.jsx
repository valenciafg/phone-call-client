
const initialState = {
    calls: []
};
const calls = (state = initialState, action) => {
    switch(action.type){
        case 'NEW_CALL':
            console.log('new call', action.call);
            return Object.assign({},state,{
                calls: [
                    ...state.calls,
                    {
                        call: action.call
                    }
                ]
            });
        default:
            return state;
    }
};

export default calls;