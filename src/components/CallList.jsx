import React,{Component} from 'react'
import { Table } from 'semantic-ui-react';

export default class CallList extends Component{
    constructor(...args){
        super(...args)
    }
    createList(){
        let calls = this.props.calls.calls
        return(
            calls.map((data)=> {
            return (
                <Table.Row>
                    <Table.Cell>{data.call.ext}</Table.Cell>
                    <Table.Cell>{data.call.dialedPhone}</Table.Cell>
                    <Table.Cell>{data.call.callTime}</Table.Cell>
                    <Table.Cell>{data.call.callDuration}</Table.Cell>
                    <Table.Cell>{data.call.callDurationSeconds}</Table.Cell>
                </Table.Row>
            )
        })
        )
    }
    render(){
        let calls = this.props.calls.calls;
        if(calls.length > 0) {
            return (
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Extension</Table.HeaderCell>
                            <Table.HeaderCell>Called Number</Table.HeaderCell>
                            <Table.HeaderCell>Start Time</Table.HeaderCell>
                            <Table.HeaderCell>Duration</Table.HeaderCell>
                            <Table.HeaderCell>Cost</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.createList()}
                    </Table.Body>
                </Table>
            )
        }
        return(
            <h3>No Calls</h3>
        )
    }
}