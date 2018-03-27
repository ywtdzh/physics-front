import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from "react-router-dom";
import {Col, Grid, Row} from "react-bootstrap";

class AllEquipStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to={"/login"}/>
        } else if (this.props.userType === 'naive') {
            return <Grid><Row><Col lgOffset={3} lg={6}>
                <Link to={"/"}>
                    <h3>您没有此操作对应的权限，点击返回</h3>
                </Link>
            </Col></Row></Grid>
        } else {
            return <Grid/>;
        }
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

export default connect(storeStateToComponentProp)(AllEquipStatus);
