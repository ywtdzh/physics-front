import React, {Component} from 'react';
import {Button, Checkbox, Col, Grid, Modal, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import ActionFactory from "../../redux/ActionFactory";
import Request from "../../request-stub";
import FieldInputGroup from "../FieldInputGroup";

class UserManagementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfoDialog: false,
            userInfoId: "",
            userInfoIdValidateState: null,
            userInfoDevice: "",
            userInfoDeviceValidateState: null,
            userInfoPassword: "",
            userInfoPasswordValidateState: null,
        };
        this.refreshList();
    }

    refreshList = () => {
        Request.getUsers(users => {
            this.props.dispatch(ActionFactory.createUsers(users));
        });
    };

    addUser = () => {
        this.setState({
            userInfoDialog: true,
            userInfoId: "",
            userInfoIdValidateState: null,
            userInfoDevice: "",
            userInfoDeviceValidateState: null,
            userInfoPassword: "",
            userInfoPasswordValidateState: 'error',
        });
    };

    modifyUser = (e) => {
        const user = this.props.users[e.target.attributes['name'].value];
        this.setState({
            userInfoDialog: true,
            userInfoId: user.id,
            userInfoIdValidateState: null,
            userInfoDevice: user.device,
            userInfoDeviceValidateState: null,
            userInfoPassword: "",
            userInfoPasswordValidateState: 'error',
        });
    };

    closeUserInfoDialog = () => {
        this.setState({
            userInfoDialog: false,
        });
    };

    deleteUsers = () => {
        const deleteList = [];
        this.props.users.forEach((ele, i) => {
            if (this.state['checkBox' + i]) deleteList.push(this.props.users[i]);
        });
        // todo submit delete operation
    };

    submitUserInfo = () => {
        // todo validate data field
        // todo post user data
        this.closeUserInfoDialog();
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onCheck = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        });
    };

    render() {
        const users = this.props.users;
        const rows = [];
        users.forEach((user, index) => {
            rows.push(<tr>
                <td style={{width: '20px'}}>
                    <Checkbox style={{margin: '0', paddingLeft: '5px'}}
                              name={'checkBox' + index} onClick={this.onCheck}/>
                </td>
                <td onClick={this.modifyUser} name={index}>{('00' + (index + 1)).slice(-2)}</td>
                <td onClick={this.modifyUser} name={index}>{user.id}</td>
                <td onClick={this.modifyUser} name={index}>{user.device}</td>
            </tr>);
        });
        return (<Grid>
            <Row><Col lg={10} lgOffset={1}>
                <h3>点击相应用户以修改信息</h3>
                <Table striped bordered responsive hover condensed>
                    <thead>
                    <tr>
                        <th/>
                        <th>#</th>
                        <th>学号</th>
                        <th>设备号</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    </tbody>
                </Table>
                <Button className="btn-danger pull-right" style={{margin: '10px'}}>删除所选用户</Button>
                <Button className="btn-info pull-right" style={{margin: '10px'}}
                        onClick={this.refreshList}>刷新列表</Button>
                <Button className="btn-success pull-right" style={{margin: '10px'}} onClick={this.addUser}>新增用户</Button>
            </Col>
            </Row>
            <Modal show={this.state.userInfoDialog} onHide={this.closeUserInfoDialog}>
                <Modal.Header>
                    <Modal.Title>用户信息</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FieldInputGroup
                        name={"userInfoId"}
                        label={"学号"}
                        value={this.state.userInfoId}
                        validationState={this.state.userInfoIdValidateState}
                        onChange={this.onChange}
                    />
                    <FieldInputGroup
                        name={"userInfoPassword"}
                        label={"密码"}
                        type={"password"}
                        value={this.state.userInfoPassword}
                        validationState={this.state.userInfoPasswordValidateState}
                        onChange={this.onChange}
                    />
                    <FieldInputGroup
                        name={"userInfoDevice"}
                        label={"设备号(1~20)"}
                        value={this.state.userInfoDevice}
                        validationState={this.state.userInfoDeviceValidateState}
                        onChange={this.onChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeUserInfoDialog}>取消</Button>
                    <Button bsStyle="primary" onClick={this.submitUserInfo}>保存</Button>
                </Modal.Footer>
            </Modal>
        </Grid>);
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let users = state.users;
    return {
        users: users,
    };
}

export default connect(storeStateToComponentProp)(UserManagementPage);
