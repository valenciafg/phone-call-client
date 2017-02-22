import React,{Component} from 'react'
import { Table } from 'semantic-ui-react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

function onAfterSaveCell(row, cellName, cellValue) {
  alert(`Save cell ${cellName} with value ${cellValue}`);
  console.log('toda mi fila es ',row)
/*
  let rowStr = '';
  for (const prop in row) {
    rowStr += prop + ': ' + row[prop] + '\n';
  }
*/
  // alert('Thw whole row :\n' + rowStr);
}
function onBeforeSaveCell(row, cellName, cellValue) {
  // You can do any validation on here for editing value,
  // return false for reject the editing
  return true;
}

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
  afterSaveCell: onAfterSaveCell  // a hook for after saving cell
};

export default class PhoneDirectoryList extends Component{
    constructor(...args){
        super(...args)
    }
    createIndexedList(){
        let phonedirectory = this.props.phonedirectory
        return(
            phonedirectory.map((data,i)=>{
                return({
                    id: data.id,
                    phone: data.phone,
                    name: data.name,
                    area: data.area,
                    location: data.location
                })
            })
        )
    }
    render(){
        // console.log('mi directorio props PhoneDirectoryList es',this.props)
        let phonedirectory = this.props.phonedirectory
        // console.log('mi directorio es',phonedirectory)
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
                <TableHeaderColumn dataField='phone' dataSort={ true } dataAlign='center' width='120'>Number</TableHeaderColumn>
                <TableHeaderColumn dataField='name' dataSort={ true } dataAlign='right'>Phone Name</TableHeaderColumn>
                <TableHeaderColumn dataField='area' dataSort={ true } dataAlign='right'>Area</TableHeaderColumn>
                <TableHeaderColumn dataField='location' dataSort={ true } dataAlign='right'>Location</TableHeaderColumn>
            </BootstrapTable>
            )
        }else{
            return(
                <h3>No phone numbers on this directory</h3>
            )
        }
    }
}
