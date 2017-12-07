import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap'
import Moment from 'moment'
import DatePicker from 'react-bootstrap-date-picker'
import {getMoreCalledPhone} from '../../actions'

class MoreCalledPhoneForm extends Component {
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
        let start = this.state.start
        let end = this.state.end
        if(end == '')
          end = Moment().format('YYYY-MM-DD')
        if(start == '')
          start = Moment().format('YYYY-MM-DD')
        const data = {
          start,
          end
        }
        this.props.getMoreCalledPhone(data)
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
                            showClearButton={false}
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
                            showClearButton={false}
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
// export default MoreCalledPhoneForm;
function mapStateToProps(state){
    return {
      moreCalledPhones: state.calls.moreCalledPhones
    }
}
export default connect(mapStateToProps,{getMoreCalledPhone})(MoreCalledPhoneForm)
