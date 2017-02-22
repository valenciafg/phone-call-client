import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
import Moment from 'moment'
import DatePicker from 'react-bootstrap-date-picker'

class DateSearchForm extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            start: Moment().format('DD-MM-YYYY'),
            end: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(type,value) {
        // const target = event.target;
        // const value = target.type === 'checkbox' ? target.checked : target.value;
        // const name = target.name;
        // console.log('handleInputChange',type)
        // console.log('handleInputChange',value)
        this.setState({
            [type]: Moment(value).format('DD-MM-YYYY')
        });
    }
    handleSubmit(event) {
        console.log('fue enviado el formulario',event)
        console.log('voy a emviar',this.state)
        event.preventDefault();
    }
    render(){
        return(
            <Form inline onSubmit={this.handleSubmit}>
                <FormGroup controlId="formInlineStartDate">
                    <ControlLabel>Start Date: </ControlLabel>
                    {' '}
                    <div className="form-group">
                        <DatePicker
                            id="start-date"
                            value={new Date().toISOString()}
                            className="form-control"
                            dateFormat="DD-MM-YYYY"
                            onChange={(e)=>this.handleInputChange('start',e)}
                        />
                    </div>
                </FormGroup>
                {'   '}
                <FormGroup controlId="formInlineEndDate">
                    <ControlLabel>End Date: </ControlLabel>
                    {' '}
                    <div className="form-group">
                        <DatePicker
                            id="end-date"
                            className="form-control"
                            dateFormat="DD-MM-YYYY"
                            onChange={(e)=>this.handleInputChange('end',e)}
                        />
                    </div>
                </FormGroup>
                {'   '}
                <Button type="submit" bsStyle="primary">
                    <Glyphicon glyph="search"/>{' '}Search
                </Button>
            </Form>
        )
    }
}

export default DateSearchForm
