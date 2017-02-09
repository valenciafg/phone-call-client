import React, {Component} from 'react'
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap';
// import 'semantic-ui-css/semantic.css'

class ExtensionSearch extends React.Component {
    constructor(...args) {
        super(...args)
    }
    render(){
        return (
            <Form inline>
                <FormGroup controlId="formInlineExtension">
                    <ControlLabel>Extension: </ControlLabel>
                    {' '}
                    <FormControl componentClass="select" placeholder="-- Select --">
                        <option value="other">...</option>
                    </FormControl>
                </FormGroup>
                <Button type="submit" bsStyle="primary" bsSize="small">
                    <Glyphicon glyph="search" />{' '}
                    Search
                </Button>
            </Form>
        )
    }
}

export default ExtensionSearch
