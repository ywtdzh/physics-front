import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, NavItem, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Actions from './redux/ActionFactory';

class SiteCollapse extends Component {
    render() {
        const {username, isLoggedIn, userType} = this.props;
        return (<Navbar.Collapse>
            {isLoggedIn && userType === 'elder' ?
                <Nav>
                    <NavItem eventKey={1}><Link to={"/admin/user"}>用户管理</Link></NavItem>
                    <NavItem eventKey={2}><Link to={"/admin/status"}>当前状态</Link></NavItem>
                </Nav> : <React.Fragment/>
            }
            {isLoggedIn && userType === 'naive' ?
                <Nav>
                    <NavItem eventKey={1}><Link to={"/user/equipment"}>设备状态</Link></NavItem>
                    <NavItem eventKey={2}><Link to={"/user/code"}>提交代码</Link></NavItem>
                    <NavItem eventKey={3}><Link to={"/user/evaluate"}>获取评测状态</Link></NavItem>
                    <NavItem eventKey={4}>下载数据{/*todo: 下载什么数据？可以放到其他页面上*/}</NavItem>
                </Nav> : <React.Fragment/>
            }
            {isLoggedIn ?
                <Nav pullRight>
                    <Navbar.Text>你好!&nbsp;{username}</Navbar.Text>
                    <NavItem><Link to={"/"}
                                   onClick={() => {
                                       /*send logout message here*/
                                       this.props.dispatch(Actions.createUserInfo({}))
                                   }}>退出</Link></NavItem>
                </Nav> :
                <Nav pullRight>
                    <NavItem><Link to={"/login"}>登录</Link></NavItem>
                </Nav>
            }
        </Navbar.Collapse>);
    }
}

SiteCollapse.propTypes = {
    isLoggedIn: PropTypes.bool,
    username: PropTypes.string,
    userType: PropTypes.string,
};

function stateToProp(state) {
    //select part of the state it need
    let user = state.userInfo;
    return {
        isLoggedIn: user && user.username,
        username: user ? user.username : null,
        userType: user ? user.type : null,
    };
}

export default connect(stateToProp)(SiteCollapse);