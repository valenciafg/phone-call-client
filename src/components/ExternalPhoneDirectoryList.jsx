import React,{Component} from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {makeExternalPhone} from '../actions'

export default class ExternalPhoneDirectoryList extends Component{
    constructor(...args){
        super(...args)
        this.options = {
            clearSearch: true,
            defaultSortName: 'phone',
            defaultSortOrder: 'desc',
            sizePerPageList: [
                {text: '10', value: 10},
                {text: '15', value: 15},
                {text: '20', value: 20},
                {text: '30', value: 30},
                {text: '40', value: 40},
                {text: '50', value: 50},
            ],
            sizePerPage: 15,
        }
    }
    createIndexedList(){
        let phonedirectory = this.props.phonedirectory
        return(
            phonedirectory.map((data,i)=>{
                return({
                    id: data.id,
                    phone: data.phone,
                    name: data.name
                })
            })
        )
    }
    onAfterSaveCell(row, cellName, cellValue) {
        console.log('toda mi fila es ',row)
        makeExternalPhone(row.phone, row.name)
        // editPhone(row)
    }
    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        return true;
    }
    render(){
        let cellEditProp = {
            mode: 'dbclick',
            blurToSave: true,
            beforeSaveCell: (r,cn,cv)=>this.onBeforeSaveCell(r,cn,cv), // a hook for before saving cell
            afterSaveCell: (r,cn,cv)=>this.onAfterSaveCell(r,cn,cv)  // a hook for after saving cell
        }
        let phonedirectory = this.props.phonedirectory
        if(phonedirectory !== undefined && phonedirectory.length > 0) {
            let indexedPhoneDirectory = this.createIndexedList();
            return (
            <BootstrapTable
                data={ indexedPhoneDirectory }
                pagination
                search={ true }
                exportCSV={ true }
                options={ this.options }
                cellEdit={ cellEditProp }
            >
                <TableHeaderColumn dataField='id' isKey hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='phone' dataSort={ true } editable={false} dataAlign='center' width='120'>Number</TableHeaderColumn>
                <TableHeaderColumn dataField='name' dataSort={ true } dataAlign='right'>Phone Name</TableHeaderColumn>
            </BootstrapTable>
            )
        }else{
            return(
                <h3>No phone numbers on this directory</h3>
            )
        }
    }
}
