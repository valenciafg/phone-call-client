import React, {Component} from 'react'
import { connect } from 'react-redux'

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

class ExtensionSearchResult extends Component{
    constructor(...args) {
        super(...args)
        this.options = {
            clearSearch: true,
            defaultSortName: 'id',
            defaultSortOrder: 'desc'
        }
    }
    createIndexedList(){
        let calls = this.props.callsSearched;
        // console.log('mis llamadas a indexar',calls);
        return(
            calls.map((data,i)=>{
                // console.log('mi dato',data)
                // let duration = new Date(data.call.callDuration).getTime()
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
        let calls = this.props.callsSearched
        if(calls !== undefined && calls.length > 0) {
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

function mapStateToProps(state){
    return {
        callsSearched: state.calls.callsSearched
    }
}
export default connect(mapStateToProps)(ExtensionSearchResult)
