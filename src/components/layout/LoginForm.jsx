import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon, HelpBlock, Alert} from 'react-bootstrap';
import classnames from 'classnames';

import validateLoginForm from '../common/loginValidation';
import { signIn, setFormLoading } from '../../actions/Auth';

class LoginForm extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = {
            username: '',
            password: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    isValid(){
        const { errors, isValid} = validateLoginForm(this.state);

        if(!isValid){
            this.setState({errors});
        }
        return isValid;
    }
    onSubmit(e){
        e.preventDefault()
        if(this.isValid()){
            this.setState({ errors: {}});
            this.props.setFormLoading();
            // browserHistory.push('/');
            this.props.signIn(this.state);
        }
        
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        this.props.setFormLoading(false);
    }
    render(){
        const { username, password, errors } = this.state;
        const form = this.props.auth.form;
        const { isLoading } = form;
        return(
            <Form className="form-signin" onSubmit={(e)=>this.onSubmit(e)}>
                {form.error &&
                <Alert bsStyle="danger">
                    <strong>Error: </strong> {form.message}
                </Alert>
                }
                <FormGroup bsSize="large" validationState={errors.username?'error':null}>
                    <FormControl type="text" placeholder="Usuario" name="username" onChange={this.onChange}/>
                    {errors.username && <HelpBlock>{errors.username}</HelpBlock>}
                </FormGroup>
                <FormGroup bsSize="large" validationState={errors.password?'error':null}>
                    <FormControl type="password" placeholder="Password" name="password" onChange={this.onChange}/>
                    {errors.password && <HelpBlock>{errors.password}</HelpBlock>}
                </FormGroup>
                <FormGroup>
                    <Button type="submit" bsSize="large" bsStyle="primary" disabled={isLoading} block>Login</Button>
                </FormGroup>
            </Form>
        )
    }
}
function mapStateToProps(state){
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps,{ signIn, setFormLoading })(LoginForm)