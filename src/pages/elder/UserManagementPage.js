import React, {Component} from 'react';
import {Button, Checkbox, Col, Grid, Modal, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import ActionFactory from "../../redux/ActionFactory";
import Request from "../../public/Request";
import FieldInputGroup from "../FieldInputGroup";
import {isNullOrUndefined} from "util";
import {Link, Redirect} from "react-router-dom";
import ErrorDialog from "../../public/ErrorDialog";

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
            networkDialog: false,
        };
        this.refreshList();
    }

    refreshList = () => {
        Request.getUsers(users => {
            if (users instanceof Error) {
                window.localStorage && (window.localStorage.error = users);
                if (users.message === 'need_login')
                    this.props.dispatch(ActionFactory.createUserInfo({}));
            }
            else this.props.dispatch(ActionFactory.createUsers(users));
        });
    };

    addUser = () => {
        this.setState({
            userInfoDialog: true,
            userInfoId: "",
            userInfoIdValidateState: 'error',
            userInfoDevice: "",
            userInfoDeviceValidateState: 'success',
            userInfoPassword: "",
            userInfoPasswordValidateState: 'error',
        });
    };

    modifyUser = (e) => {
        const user = this.props.users[e.target.attributes['name'].value];
        this.setState({
            userInfoDialog: true,
            userInfoId: user.id,
            userInfoIdValidateState: 'success',
            userInfoDevice: user.device,
            userInfoDeviceValidateState: 'success',
            userInfoPassword: 999999,
            userInfoPasswordValidateState: 'success',
        });
    };

    closeUserInfoDialog = () => {
        this.setState({
            userInfoDialog: false,
        });
    };

    closeNetworkDialog = () => {
        this.setState({
            networkDialog: false,
        });
    };

    deleteUsers = () => {
        const deleteList = [], clearState = {};
        this.props.users.forEach((user, i) => {
            if (this.state['checkBox' + i]) deleteList.push(user.id);
            clearState['checkBox' + i] = false;
        });
        this.setState(clearState);
        Request.deleteUsers(deleteList, () => this.refreshList());
    };

    submitUserInfo = () => {
        if (this.state.userInfoIdValidateState === 'error' || this.state.userInfoDeviceValidateState === 'error'
            || this.state.userInfoPasswordValidateState === 'error') return;
        Request.createOrUpdateUser({
            id: parseInt(this.state.userInfoId, 10),
            password: this.state.userInfoPassword === 999999 ? undefined : this.state.userInfoPassword,
            device: isNaN(parseInt(this.state.userInfoDevice, 10)) ? 0 : parseInt(this.state.userInfoDevice, 10),
        }, (error) => {
            if (error instanceof Error) {
                window.localStorage && (window.localStorage.error = error);
                if (error.message === 'need_login')
                    this.props.dispatch(ActionFactory.createUserInfo({}));
                this.setState({networkDialog: true});
            }
            this.closeUserInfoDialog();
            this.refreshList();
        });
    };

    onChange = (e) => {
        const state = {
            [e.target.name]: e.target.value,
            [e.target.name + 'ValidateState']: null,
        };
        switch (e.target.name) {
            case "userInfoDevice":
                state[e.target.name + 'ValidateState'] =
                    (e.target.value === '' || (parseInt(e.target.value, 10) <= 20 && parseInt(e.target.value, 10) >= 0))
                        ? 'success' : 'error';
                break;
            case "userInfoId":
                state[e.target.name + 'ValidateState'] = parseInt(e.target.value, 10).toString() === e.target.value
                    ? 'success' : 'error';
                break;
            case "userInfoPassword":
                state[e.target.name + 'ValidateState'] = e.target.value.length > 2 ? 'success' : 'error';
                break;
            default:
        }
        this.setState(state);
    };

    onCheck = (e) => {
        this.setState({
            [e.target.name]: e.target.checked
        });
    };

    render = () => {
        if (!this.props.isLoggedIn) {
            Request.getUserInfo(null, (userInfo) => {
                if (userInfo && userInfo.id)
                    this.props.dispatch(ActionFactory.createUserInfo(userInfo));
            });
            this.props.dispatch(ActionFactory.createPreviousPage('/admin/user'));
            return <Redirect to={"/login"}/>
        } else if (this.props.userType === 'naive') {
            this.props.dispatch(ActionFactory.createPreviousPage(''));
            return <Grid><Row><Col lgOffset={3} lg={6}>
                <Link to={"/"}>
                    <h3>您没有此操作对应的权限，点击返回</h3>
                </Link>
            </Col></Row></Grid>
        }
        this.props.dispatch(ActionFactory.createPreviousPage(''));
        const users = this.props.users;
        const rows = [];
        users.forEach((user, index) => {
            rows.push(<tr>
                <td style={{width: '20px'}}>
                    <Checkbox style={{margin: '0', paddingLeft: '5px'}} checked={this.state['checkBox' + index]}
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
                <Button className="btn-danger pull-right" style={{margin: '10px'}}
                        onClick={this.deleteUsers}>删除所选用户</Button>
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
            <ErrorDialog show={this.state.networkDialog} onHide={this.closeNetworkDialog}
                         message={`错误信息：${window.localStorage.error || '未知错误'}`}/>
        </Grid>);
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let users = state.users;
    return {
        users: users,
        isLoggedIn: state.userInfo && !isNullOrUndefined(state.userInfo.id),
        userType: state.userInfo && state.userInfo.type,
    };
}

export default connect(storeStateToComponentProp)(UserManagementPage);
