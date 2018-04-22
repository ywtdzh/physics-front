import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import ActionFactory from "../../redux/ActionFactory";
import Request from '../../public/Request';
import {Button, Col, Grid, Row, Table} from "react-bootstrap";
import CodeEditor from "./CodeEditor";

class NaivePage extends Component {

    constructor(props) {
        super(props);
        this.state = {code: props.code};
        this.getOwnStatus();
        this.getCode();
        this.getDownloadLink();
    }

    componentDidMount = () => {
        const timer = setInterval(()=>{
            this.getOwnStatus();
            this.getDownloadLink();
        }, 5000);
        this.setState({timer});
    };

    componentWillUnmount = () => {
        clearInterval(this.state.timer);
    };

    getOwnStatus = () => {
        Request.getOwnEquipStatus(status => {
            if (status instanceof Error) {
                window.localStorage && (window.localStorage.error = status);
                if (status.message === 'need_login')
                    this.props.dispatch(ActionFactory.createUserInfo({}));
            }
            else this.props.dispatch(ActionFactory.createEquipStatus(status));
        });
    };

    getCode = () => {
        Request.getCode(code => {
            if (code instanceof Error) {
                window.localStorage && (window.localStorage.error = code);
                if (code.message === 'need_login')
                    this.props.dispatch(ActionFactory.createUserInfo({}));
            }
            else {
                this.setState({
                    code: code,
                });
                this.props.dispatch(ActionFactory.createCode(code || ''));
            }
        });
    };

    getDownloadLink = () => {
        Request.getDownloadLink(downloadLink => {
            if (downloadLink instanceof Error) {
                window.localStorage && (window.localStorage.error = downloadLink);
                if (downloadLink.message === 'need_login')
                    this.props.dispatch(ActionFactory.createUserInfo({}));
            }
            else this.props.dispatch(ActionFactory.createDownloadLink(downloadLink));
        });
    };

    render() {
        if (!this.props.isLoggedIn) {
            Request.getUserInfo(null, (userInfo) => {
                if (userInfo && userInfo.id)
                    this.props.dispatch(ActionFactory.createUserInfo(userInfo));
            });
            this.props.dispatch(ActionFactory.createPreviousPage('/user'));
            return <Redirect to={"/login"}/>
        } else if (this.props.userInfo.type === 'elder') {
            this.props.dispatch(ActionFactory.createPreviousPage(''));
            return <Redirect to={"/admin/user"}/>;
        }
        this.props.dispatch(ActionFactory.createPreviousPage(''));
        const ownStatus = [];
        for (let key in this.props.equipStatus) {
            if (this.props.equipStatus.hasOwnProperty(key)) {
                ownStatus.push(<tr>
                    <td>{key}</td>
                    <td>{this.props.equipStatus[key].toString()}</td>
                </tr>);
            }
        }
        return <Grid><Row><Col lg={10} lgOffset={1}>
            <h2>当前设备状态：</h2>
            <Table striped condensed bordered responsive hover>
                <tbody>{ownStatus}</tbody>
            </Table>
            <Button bsStyle={"info"} className={"pull-right"} onClick={this.getOwnStatus}>刷新设备信息</Button>
            <CodeEditor value={this.state.code} onBeforeChange={(editor, data, value) => {
                this.setState({code: value});
            }}/>
            {this.props.downloadLink
                ? <React.Fragment/> :
                <React.Fragment>
                    <hr/>
                    <h2>当前设备数据：</h2>
                    <Button bsStyle={"success"} className={"pull-right"}
                            onClick={() => {
                                if (this.props.downloadLink) window.location.href = this.props.downloadLink;
                            }}>下载数据</Button>
                </React.Fragment>
            }
        </Col></Row></Grid>;
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    const {userInfo, equipStatus, code, downloadLink} = state;
    return {
        isLoggedIn: !!(userInfo && userInfo.id),
        userInfo,
        equipStatus,
        code: code,
        downloadLink: downloadLink,
    };
}

export default connect(storeStateToComponentProp)(NaivePage);
