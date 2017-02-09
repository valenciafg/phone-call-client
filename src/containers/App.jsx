import React, {Component} from 'react'
import NavBar from '../components/NavBar'
// import 'semantic-ui-css/semantic.css'

class App extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return (
            <div>
                <NavBar/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App
