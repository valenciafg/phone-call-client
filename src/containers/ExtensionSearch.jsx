import React, {Component} from 'react'
import ExtensionSearchForm from '../components/layout/ExtensionSearchForm'

export default class ExtensionSearch extends Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return (
            <div>
                <h2>Search by Extension</h2>
                <ExtensionSearchForm />
            </div>
        )
    }
}
