import React,{Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class CallsTable extends Component{
    constructor(...args){
        super(...args)
    }
    render(){
        return(
            <BootstrapTable
                data={ this.props.calls }
                search={ true }
                exportCSV={ true }
                options={ this.props.options }
                pagination={ true }
                multiColumnSort={ 2 }
            >
                <TableHeaderColumn dataField='id' isKey width='80' hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='ext' dataSort={ true } dataAlign='center' width='120'>Extension</TableHeaderColumn>
                <TableHeaderColumn dataField='dialedPhone' dataSort={ true } dataAlign='right' width='180'>Called Number</TableHeaderColumn>
                <TableHeaderColumn dataField='callTime' dataSort={ true } dataAlign='right' width='220'>Start Time</TableHeaderColumn>
                <TableHeaderColumn dataField='callDuration' dataAlign='right' width='220'>Duration (Min:Sec.MS)</TableHeaderColumn>
                <TableHeaderColumn dataField='callDate' dataSort={ true } dataAlign='right' width='200'>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='callDateUnix' dataSort={ true } hidden>Date Unix</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}
