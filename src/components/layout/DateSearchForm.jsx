import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
import Moment from 'moment'
import DatePicker from 'react-bootstrap-date-picker'
import {searchCallsByDate} from '../../actions'

class DateSearchForm extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            start: Moment().format(),
            end: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(type,value) {
        this.setState({
            [type]: Moment(value).format()
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.searchCallsByDate(this.state.start,this.state.end)
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
                            value={this.state.start}
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
                            value={this.state.end}
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
function mapStateToProps(state){
    return {
        callsSearched: state.calls.callsSearched
    }
}
export default connect(mapStateToProps,{searchCallsByDate})(DateSearchForm)
