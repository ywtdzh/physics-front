import React, {Component} from 'react';
import FieldInputGroup from './FieldInputGroup';
import {Button, Col, FormGroup, Grid, Row} from "react-bootstrap";
import {connect} from 'react-redux';
import Actions from '../redux/ActionFactory';
import Request from '../public/Request';
import {Redirect} from "react-router-dom";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            password: '',
        };
    }

    onChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();
        Request.getUserInfo({id: this.state.id, password: this.state.password}, (userInfo) => {
            this.props.dispatch(Actions.createUserInfo(userInfo));
        });
    };

    render() {
        if (this.props.isLoggedIn) {
            return <Redirect to={"/"}/>
        }
        return (<Grid>
            <Row><Col mdOffset={3} md={6}>
                <FieldInputGroup
                    name={"id"}
                    label={"用户名"}
                    readOnly={false}
                    value={this.state.device}
                    type={"text"}
                    placeHolder={"请输入用户名"}
                    onChange={this.onChange}
                />
                <FieldInputGroup
                    name={"password"}
                    label={"密码"}
                    readOnly={false}
                    value={this.state.password}
                    type={"password"}
                    placeHolder={"请输入密码"}
                    onChange={this.onChange}
                />
                <FormGroup>
                    <Button block={true} onClick={this.onSubmit}>立即登录</Button>
                </FormGroup>
            </Col></Row>
        </Grid>);
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let user = state.userInfo;
    return {
        isLoggedIn: user && user.id,
        id: user ? user.id : null,
        userType: user ? user.type : null,
    };
}

export default connect(storeStateToComponentProp)(LoginForm);
