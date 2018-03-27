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
            addUserDialog: false,
            newUserId: "",
            newUserIdValidateState: null,
            newUserDevice: "",
            newUserDeviceValidateState: null,
            newUserPassword: "",
            newUserPasswordValidateState: null,
        };
        this.refreshList();
    }

    refreshList = () => {
        Request.getUsers(users => {
            this.props.dispatch(ActionFactory.createUsers(users));
        });
    };

    openAddUserDialog = () => {
        this.setState({
            addUserDialog: true,
        });
    };

    closeAddUserDialog = () => {
        this.setState({
            addUserDialog: false,
        });
    };

    submitAddUser = () => {
        // todo validate data field
        // todo post user data
        this.closeAddUserDialog();
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        const users = this.props.users;
        const rows = [];
        users.forEach((user, index) => {
            rows.push(<tr>
                <td style={{width: '20px'}}><Checkbox style={{margin: '0', paddingLeft: '5px'}}
                                                      name={(index + 1).toString()}/></td>
                <td>{('0' + (index + 1)).slice(-2)}</td>
                <td>{user.id}</td>
                <td>{user.device}</td>
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
                <Button className="btn-info pull-right" style={{margin: '10px'}} onClick={this.refreshList}>刷新列表</Button>
                <Button className="btn-success pull-right" style={{margin: '10px'}} onClick={this.openAddUserDialog}>新增用户</Button>
            </Col>
            </Row>
            <Modal show={this.state.addUserDialog} onHide={this.closeAddUserDialog}>
                <Modal.Header>
                    <Modal.Title>添加用户</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FieldInputGroup
                        name={"newUserId"}
                        label={"学号"}
                        value={this.state.newUserId}
                        validationState={this.state.newUserIdValidateState}
                        onChange={this.onChange}
                    />
                    <FieldInputGroup
                        name={"newUserPassword"}
                        label={"密码"}
                        type={"password"}
                        value={this.state.newUserPassword}
                        validationState={this.state.newUserPasswordValidateState}
                        onChange={this.onChange}
                    />
                    <FieldInputGroup
                        name={"newUserDevice"}
                        label={"设备号(1~20)"}
                        value={this.state.newUserDevice}
                        validationState={this.state.newUserDeviceValidateState}
                        onChange={this.onChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeAddUserDialog}>取消</Button>
                    <Button bsStyle="primary" onClick={this.submitAddUser}>保存</Button>
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
