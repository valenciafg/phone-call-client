import React,{Component} from 'react'
import { Table } from 'semantic-ui-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class CallList extends Component{
    constructor(...args){
        super(...args)
        this.options = {
            clearSearch: true,
            defaultSortName: 'id',
            defaultSortOrder: 'desc'
        }
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
                    <Table.Cell>{data.call.cost}</Table.Cell>
                </Table.Row>
            )
        })
        )
    }
    createIndexedList(){
        let calls = this.props.calls.calls;
        // console.log('mis llamadas a indexar',calls);
        return(
            calls.map((data,i)=>{
                // console.log('mi dato',data)
                return({
                    id: i,
                    ext:data.call.ext,
                    dialedPhone: data.call.dialedPhone,
                    callTime: data.call.callTime,
                    callDuration: data.call.callDuration
                })
            })
        )
    }
    render(){
        let calls = this.props.calls.calls;
        if(calls.length > 0) {
            let indexedCalls = this.createIndexedList();
            return (
            <BootstrapTable
                data={ indexedCalls }
                pagination
                search={ true }
                exportCSV={ true }
                options={ this.options }
            >
                <TableHeaderColumn dataField='id' isKey>#</TableHeaderColumn>
                <TableHeaderColumn dataField='ext'>Extension</TableHeaderColumn>
                <TableHeaderColumn dataField='dialedPhone'>Called Number</TableHeaderColumn>
                <TableHeaderColumn dataField='callTime'>Start Time</TableHeaderColumn>
                <TableHeaderColumn dataField='callDuration'>Duration</TableHeaderColumn>
            </BootstrapTable>
            )
        }
        return(
            <h3>No Calls Received</h3>
        )
    }
}
