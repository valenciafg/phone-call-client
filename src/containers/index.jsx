import React, {Component} from 'react'
import { connect } from 'react-redux'
import Login from './Login'
import OnlineCalls from './OnlineCalls'

class Index extends Component{
  constructor(...args) {
    super(...args)
  }
  render(){
    const {loggedin} = this.props.auth
    if(loggedin){
      return(<OnlineCalls/>)
    }else{
      return(<Login/>)
    }
  }
}
function mapStateToProps(state){
  return {
      auth: state.auth
  }
}
export default connect(mapStateToProps,{})(Index)