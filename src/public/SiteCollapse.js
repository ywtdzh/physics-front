import React, {Component} from "react";
import {connect} from "react-redux";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {Link} from 'react-router-dom';
import ActionFactory from '../redux/ActionFactory';
import Request from '../public/Request';

class SiteCollapse extends Component {
    constructor(props) {
        super(props);
        Request.getDownloadLink(() => {
            this.props.dispatch(ActionFactory.createDownloadLink());
        });
    }

    render() {
        const {id, isLoggedIn, userType} = this.props;
        return (<Navbar.Collapse>
            {isLoggedIn && userType === 'elder' ?
                <Nav>
                    <NavItem eventKey={1}><Link to={"/admin/user"}>用户管理</Link></NavItem>
                    <NavItem eventKey={2}><Link to={"/admin/status"}>设备状态</Link></NavItem>
                    <NavItem eventKey={3}><Link to={this.props.downloadLink}>下载数据</Link></NavItem>
                </Nav> : <React.Fragment/>
            }
            {
                <React.Fragment/>
            }
            {isLoggedIn ?
                <Nav pullRight>
                    <Navbar.Text>你好!&nbsp;{id}</Navbar.Text>
                    <NavItem><Link to={"/"}
                                   onClick={() => {
                                       /*send logout message here*/
                                       this.props.dispatch(ActionFactory.createUserInfo({}));
                                       Request.logOut();
                                   }}>退出</Link></NavItem>
                </Nav> :
                <Nav pullRight>
                    <NavItem><Link to={"/login"}>登录</Link></NavItem>
                </Nav>
            }
        </Navbar.Collapse>);
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let user = state.userInfo;
    return {
        isLoggedIn: !!(user && user.id),
        id: user ? user.id : null,
        userType: user ? user.type : null,
        downloadLink: state.downloadLink,
    };
}

export default connect(storeStateToComponentProp)(SiteCollapse);