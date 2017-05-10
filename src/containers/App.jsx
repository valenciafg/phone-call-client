import React, {Component} from 'react'
import NavBar from '../components/NavBar'

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
