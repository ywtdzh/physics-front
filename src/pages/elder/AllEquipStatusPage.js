import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {Button, Col, Grid, Row, Table} from "react-bootstrap";
import {isNullOrUndefined} from 'util';
import ActionFactory from "../../redux/ActionFactory";
import Request from '../../public/Request';
import Config from "../../public/config";

class AllEquipStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getEquipmentStatus();
    }

    componentDidMount = () => {
        const timer = setInterval(() => {
            this.getEquipmentStatus();
        }, 5000);
        this.setState({timer});
    };

    componentWillUnmount = () => {
        clearInterval(this.state.timer);
    };

    getEquipmentStatus = () => {
        Request.getEquipStatus(status => {
            if (status instanceof Error) {
                window.localStorage && (window.localStorage.error = status);
                if (status.message === 'need_login')
                    this.props.dispatch(ActionFactory.createUserInfo({}));
            }
            else this.props.dispatch(ActionFactory.createEquipStatus(status));
        });
    };

    render = () => {
        if (!this.props.isLoggedIn) {
            Request.getUserInfo(null, (userInfo) => {
                if (userInfo && userInfo.id)
                    this.props.dispatch(ActionFactory.createUserInfo(userInfo));
            });
            this.props.dispatch(ActionFactory.createPreviousPage('/admin/status'));
            return <Redirect to={"/login"}/>;
        } else if (this.props.userType === 'naive') {
            this.props.dispatch(ActionFactory.createPreviousPage(''));
            return <Grid><Row><Col lgOffset={3} lg={6}>
                <Link to={"/"}>
                    <h3>您没有此操作对应的权限，点击返回</h3>
                </Link>
            </Col></Row></Grid>
        }
        this.props.dispatch(ActionFactory.createPreviousPage(''));
        const rows = [];
        this.props.equipStatus.forEach(ele => {
            rows.push(<tr>
                <td>{ele.device}</td>
                <td>{ele.code_status}</td>
                <td>{ele.code_status_detail}</td>
                <td>{ele.pwm}</td>
                <td>{ele.generator_i}</td>
                <td>{ele.generator_u}</td>
                <td>{ele.payload_i}</td>
                <td>{ele.payload_u}</td>
            </tr>);
        });

        return <Grid><Row><Col>
            <Table striped bordered responsive condensed>
                <thead>
                <tr>
                    <th>设备号</th>
                    <th>状态</th>
                    <th>详细信息</th>
                    <th>pwm</th>
                    <th>generator_i</th>
                    <th>generator_u</th>
                    <th>payload_i</th>
                    <th>payload_u</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
            <Button bsStyle={"info"} className={"pull-right"}
                    onClick={() => {
                        let win = window.open('about:blank');
                        setTimeout(() => {
                            win.document.body.innerHTML = "<h2> 服务器正在生成文件，这可能要消耗较长的一段时间，请稍候...... </h2>";
                        }, 200);
                        Request.getDownloadLink(link => {
                            if (link instanceof Error) {
                                if (window.localStorage) window.localStorage.error = link;
                                win.document.body.innerHTML = "<h2>抱歉，由于服务器内部错误未能生成数据，请联系管理员</h2>";
                            } else {
                                win.location.href = Config.staticServer() + link;
                                win.document.body.innerHTML = "<p>若下载没有开始，请点击此链接：<a href='" +
                                    Config.staticServer() + link +
                                    "'>点此下载</a></p>";
                            }
                        });
                    }}>下载数据</Button>
        </Col></Row></Grid>;
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let equipStatus = state.equipStatus;
    if (equipStatus instanceof Array)
        equipStatus.sort((a, b) => parseInt(a.device, 10) - parseInt(b.device, 10));
    else
        equipStatus = [];
    return {
        isLoggedIn: state.userInfo && !isNullOrUndefined(state.userInfo.id),
        userType: state.userInfo && state.userInfo.type,
        equipStatus,
    };
}

export default connect(storeStateToComponentProp)(AllEquipStatus);
