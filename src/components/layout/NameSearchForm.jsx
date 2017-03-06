import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
import Select2 from 'react-select2-wrapper'
import {searchCallsByName} from '../../actions'

class NameSearchForm extends React.Component {
    constructor(...args) {
        super(...args)
        this.cbSelect = this.cbSelect.bind(this)
    }
    createOptionsList(){
        let directory = this.props.phonedirectory
        if(directory!== undefined && directory.length > 0){
            return(
                directory.map((data,i)=>{
                    return(<option value={data.name} key={i}>{data.name}</option>)
                })
            )
        }else{
            return(<option value="other">...</option>)
        }
    }
    createOptionsData(){
        let directory = this.props.phonedirectory
        if(directory!== undefined && directory.length > 0){
            return(
                directory.map((data,i)=>{
                    return(
                        {
                            id: data.name,
                            text: data.name
                        }
                    )
                })
            )
        }else{
            return([{id:1,text:'Empty'}])
        }
    }
    cbSelect(e){
        let data = e.params.data
        //let phoneID = data.id
        let phoneName = data.id
        // console.log('Voy a buscar el id ',phoneID,' con el nombre ',phoneName)
        this.props.searchCallsByName(phoneName)
    }
    render(){
        // console.log('phonedirectory', this.props.phonedirectory)
        return (
            <Form inline>
                <FormGroup controlId="formInlineExtension">
                    <ControlLabel>Phone Name: </ControlLabel>
                    {' '}
                    <div className="form-group">
                        <Select2
                            id="formInlineName"
                            className="form-control"
                            data={this.createOptionsData()}
                            options={{
                              placeholder: 'search by phone name',
                            }}
                            onSelect={this.cbSelect}
                        />
                    </div>
                </FormGroup>
            </Form>
        )
    }
}
function mapStateToProps(state){
    return {
        callsSearched: state.calls.callsSearched
    }
}
export default connect(mapStateToProps,{searchCallsByName})(NameSearchForm)
