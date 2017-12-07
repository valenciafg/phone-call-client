import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
import Select2 from 'react-select2-wrapper'
import {searchExternalCallsByName} from '../../actions'

class ExternalSearchForm extends React.Component {
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
        let phoneID = data.id
        const params = {
            ext_id: phoneID
        }
        this.props.searchExternalCallsByName(params)
    }
    render(){
        return (
            <Form inline>
                <FormGroup controlId="formInlineExtension">
                    <ControlLabel>External Number: </ControlLabel>
                    {' '}
                    <div className="form-group">
                        <Select2
                            id="formInlineExtension"
                            className="form-control"
                            data={this.createOptionsData()}
                            options={{
                              placeholder: 'Search External Phone',
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
export default connect(mapStateToProps,{searchExternalCallsByName})(ExternalSearchForm)
