import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, NavItem, Navbar} from "react-bootstrap";
import {Link} from 'react-router-dom';

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
                    <NavItem eventKey={1} href="#" onClick={() => {
                    }}>退出</NavItem>
                </Nav> :
                <Nav pullRight>
                    <NavItem eventKey={1} href="#" onClick={() => {
                    }}>登录</NavItem>
                </Nav>
            }
        </Navbar.Collapse>);
    }
}

function stateSelector(state) {
    //select part of the state it need
    return {
        isLoggedIn: state.isLoggedIn || null,
        username: state.username || null,
        userType: state.userType || null,
    };
}

export default connect(stateSelector)(SiteCollapse);