import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getMoreCalledPhone, searchExternalCallsByName } from '../../actions'

class MoreCalledPhoneResult extends Component{
    constructor(...args) {
        super(...args)
        this.options = {
            clearSearch: true,
            defaultSortName: 'myTop',
            defaultSortOrder: 'desc',
            sizePerPageList: [
                {text: '10', value: 10},
                {text: '15', value: 15},
                {text: '20', value: 20},
                {text: '30', value: 30},
                {text: '40', value: 40},
                {text: '50', value: 50},
            ],
            sizePerPage: 20,
        }
        this.externalNumberFormatter = this.externalNumberFormatter.bind(this);
        this.handleClickExternalNumber = this.handleClickExternalNumber.bind(this);
    }
    createIndexedList(){
        let moreCalledPhones = this.props.moreCalledPhones;
        return(
            moreCalledPhones.map((data,i)=>{
                return({
                    id: i,
                    myTop: data.myTop,
                    PhoneDestination: data.PhoneDestination,
                    Name: data.Name
                })
            })
        )
    }
    handleClickExternalNumber(e, cell){
        const data = {
            ext_number: cell
        }
        this.props.searchExternalCallsByName(data)
        browserHistory.push('/extname')
    }
    externalNumberFormatter(cell){
        return(<a href="#" onClick={(e)=>this.handleClickExternalNumber(e, cell)}>{cell}</a>)
    }
    render(){
        let moreCalledPhones = this.props.moreCalledPhones
        if(moreCalledPhones !== undefined && moreCalledPhones.length > 0) {
            let myCalls = this.createIndexedList();
            return (
                <BootstrapTable
                data={ myCalls }
                search={ true }
                exportCSV={ true }
                options={ this.options }
                pagination={ true }
                multiColumnSort={ 2 }
            >
                <TableHeaderColumn dataField='id' isKey width='80' editable={false} hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='PhoneDestination' dataFormat={(cell)=>this.externalNumberFormatter(cell)} dataSort={ true } editable={false} dataAlign='center' width='120'>Phone Numeber</TableHeaderColumn>
                <TableHeaderColumn dataField='Name' dataSort={ true } editable={false} dataAlign='center' width='180'>Phone Name</TableHeaderColumn>
                <TableHeaderColumn dataField='myTop' dataSort={ true } editable={false} dataAlign='right' width='120'>Counter</TableHeaderColumn>
            </BootstrapTable>
            )
        }
        return(
            <h3>No calls on top</h3>
        )
    }
}

function mapStateToProps(state){
    return {
        moreCalledPhones: state.calls.moreCalledPhones
    }
}
export default connect(mapStateToProps, {searchExternalCallsByName})(MoreCalledPhoneResult)
