import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
import Select2 from 'react-select2-wrapper'
import {searchCallsByExtension} from '../../actions'

class ExtensionSearchForm extends React.Component {
    constructor(...args) {
        super(...args)
        this.cbSelect = this.cbSelect.bind(this)
    }
    createOptionsData(){
        let directory = this.props.phonedirectory
        if(directory!== undefined && directory.length > 0){
            return(
                directory.map((data,i)=>{
                    return(
                        {
                            id: data.id,
                            text: data.phone
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
        let phoneID = data.id
        let phoneName = data.text
        // console.log('Voy a buscar el id ',phoneID,' con el nombre ',phoneName)
        this.props.searchCallsByExtension(phoneName)
    }
    render(){
        // console.log('phonedirectory', this.props.phonedirectory)
        return (
            <Form inline>
                <FormGroup controlId="formInlineExtension">
                    <ControlLabel>Extension: </ControlLabel>
                    {' '}
                    <div className="form-group">
                        <Select2
                            id="formInlineExtension"
                            className="form-control"
                            data={this.createOptionsData()}
                            options={{
                              placeholder: 'search by phone number',
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
export default connect(mapStateToProps,{searchCallsByExtension})(ExtensionSearchForm)
