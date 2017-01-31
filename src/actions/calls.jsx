export function getCalls(){
    return(dispatch,getState)=>{
        let original_state = getState()
        console.log(original_state)
        dispatch({
            calls:original_state.calls
        })
    }
}