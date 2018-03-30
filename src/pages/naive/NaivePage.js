import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from "react-router-dom";
import ActionFactory from "../../redux/ActionFactory";
import Request from '../../public/Request';
import {Button, Col, Grid, Row, Table} from "react-bootstrap";
import Util from 'util';
import CodeEditor from "./CodeEditor";

class NaivePage extends Component {

    constructor(props) {
        super(props);
        this.state = {code: ''};
        this.getOwnStatus();
        this.getCode();
        this.getDownloadLink();
    }

    getOwnStatus = () => {
        Request.getOwnEquipStatus(status => {
            this.props.dispatch(ActionFactory.createEquipStatus(status));
        });
    };

    getCode = () => {
        Request.getCode(code => {
            this.props.dispatch(ActionFactory.createCode(code));
        });
    };

    getDownloadLink = () => {
        Request.getDownloadLink(downloadLink => {
            this.props.dispatch(ActionFactory.createDownloadLink(downloadLink));
        });
    };

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to={"/login"}/>
        } else if (this.props.userInfo.type === 'elder') {
            return <Redirect to={"/admin/user"}/>;
        }
        const ownStatus = [];
        for (let key in this.props.equipStatus) {
            if (this.props.equipStatus.hasOwnProperty(key)) {
                ownStatus.push(<tr>
                    <td>{key}</td>
                    <td>{this.props.equipStatus[key]}</td>
                </tr>);
            }
        }
        return <Grid><Row><Col lg={10} lgOffset={1}>
            <h2>当前设备状态：</h2>
            <Table striped condensed bordered responsive hover>
                <tbody>{ownStatus}</tbody>
            </Table>
            <Button bsStyle={"info"} className={"pull-right"} onClick={this.getOwnStatus}>刷新设备信息</Button>
            <CodeEditor value={this.state.code} onChange={(editor, data, value) => {
                this.setState({code: data});
            }}/>
            {Util.isNullOrUndefined(this.props.downloadLink.downloadLink)
                ? <React.Fragment/> :
                <React.Fragment>
                    <hr/>
                    <h2>当前设备数据：</h2>
                    <a href={this.props.downloadLink.downloadLink}>
                        <Button bsStyle={"success"} className={"pull-right"}>下载数据</Button></a>
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
        code,
        downloadLink,
    };
}

export default connect(storeStateToComponentProp)(NaivePage);
