import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {Button, Col, Grid, Row, Table} from "react-bootstrap";
import {isNullOrUndefined} from 'util';
import ActionFactory from "../../redux/ActionFactory";
import Request from '../../request-stub';

class AllEquipStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.getEquipmentStatus();
    }

    getEquipmentStatus = () => {
        Request.getEquipStatus(status => {
            this.props.dispatch(ActionFactory.createEquipStatus(status));
        });
    };

    render = () => {
        if (!this.props.isLoggedIn) {
            return <Redirect to={"/login"}/>
        } else if (this.props.userType === 'naive') {
            return <Grid><Row><Col lgOffset={3} lg={6}>
                <Link to={"/"}>
                    <h3>您没有此操作对应的权限，点击返回</h3>
                </Link>
            </Col></Row></Grid>
        }
        const rows = [];
        this.props.equipStatus.forEach(ele => {
            rows.push(<tr>
                <td>ele.device</td>
                <td>ele.msg</td>
                <td>ele.detail</td>
                <td>ele.pwm</td>
                <td>ele.generator_i</td>
                <td>ele.generator_u</td>
                <td>payload_i</td>
                <td>payload_u</td>
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
            <Button bsStyle={"info"} className={"pull-right"}>下载数据</Button>  {/*todo*/}
        </Col></Row></Grid>;
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let equipStatus = state.equipStatus;
    equipStatus.sort((a, b) => parseInt(a.device, 10) - parseInt(b.device, 10));
    return {
        isLoggedIn: state.userInfo && !isNullOrUndefined(state.userInfo.id),
        userType: state.userInfo && state.userInfo.type,
        equipStatus,
    };
}

export default connect(storeStateToComponentProp)(AllEquipStatus);