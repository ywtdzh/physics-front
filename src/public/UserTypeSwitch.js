import React, {Component} from 'react';
import {connect} from 'react-redux';
import {isNullOrUndefined} from "util";
import {Redirect} from "react-router-dom";

class UserTypeSwitch extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return <Redirect to={"/login"}/>
        } else if (this.props.previousPage) {
            return <Redirect to={this.props.previousPage}/>
        } else if (this.props.userType === 'naive') {
            return <Redirect to={"/user"}/>
        } else if (this.props.userType === 'elder') {
            return <Redirect to={"/admin/user"}/>
        }
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    return {
        isLoggedIn: state.userInfo && !isNullOrUndefined(state.userInfo.id),
        userType: state.userInfo && state.userInfo.type,
        previousPage: state.previousPage,
    };
}

export default connect(storeStateToComponentProp)(UserTypeSwitch);
