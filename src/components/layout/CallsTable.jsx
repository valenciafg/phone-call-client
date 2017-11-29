import React,{Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {makeExternalPhone} from '../../actions'

export default class CallsTable extends Component{
    constructor(...args){
        super(...args)
    }
    onAfterSaveCell(row, cellName, cellValue) {
        // console.log('toda mi fila es ',row)
        makeExternalPhone(row.dialedPhone, row.dialedPhoneName)
        // editPhone(row)
    }
    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        return true;
    }
    render(){
        const myCalls = this.props.calls
        const cellEditProp = {
            mode: 'dbclick',
            blurToSave: true,
            beforeSaveCell: (r,cn,cv)=>this.onBeforeSaveCell(r,cn,cv), // a hook for before saving cell
            afterSaveCell: (r,cn,cv)=>this.onAfterSaveCell(r,cn,cv),  // a hook for after saving cell
            nonEditableRows: function() {
                // if product id less than 3, will cause the whole row noneditable
                // this function should return an array of row keys
                return myCalls.filter(c => c.dialedPhoneName !== '').map(c => c.dialedPhoneName);
            }
        }
        return(
            <BootstrapTable
                data={ myCalls }
                search={ true }
                exportCSV={ true }
                options={ this.props.options }
                cellEdit={ cellEditProp }
                pagination={ true }
                multiColumnSort={ 2 }
            >
                <TableHeaderColumn dataField='id' isKey width='80' editable={false} hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='ext' dataSort={ true } editable={false} dataAlign='center' width='120'>Extension</TableHeaderColumn>
                <TableHeaderColumn dataField='extName' dataSort={ true } editable={false} dataAlign='center' width='180'>Extension Name</TableHeaderColumn>
                <TableHeaderColumn dataField='dialedPhone' dataSort={ true } editable={false} dataAlign='right' width='120'>Called Number</TableHeaderColumn>
                <TableHeaderColumn dataField='dialedPhoneName' dataSort={ true } dataAlign='right' width='140'>Called Number Name</TableHeaderColumn>
                <TableHeaderColumn dataField='callTime' dataSort={ true } editable={false} dataAlign='right' width='120'>Start Time (Hour:Min)</TableHeaderColumn>
                <TableHeaderColumn dataField='callDuration' dataAlign='right' editable={false} width='100'>Duration (Min:Sec)</TableHeaderColumn>
                <TableHeaderColumn dataField='callDate' dataSort={ true } editable={false} dataAlign='right' width='150'>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='callDateUnix' dataSort={ true } hidden>Date Unix</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}
