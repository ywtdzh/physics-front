import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from "react-bootstrap";
import logo from '../logo.svg';
import {Link} from "react-router-dom";
import Config from "./config";
import Request from "./Request";
import ActionFactory from "../redux/ActionFactory";
import {connect} from "react-redux";

class SiteHeader extends Component {
    render() {
        const {id, isLoggedIn, userType} = this.props;
        return (<Navbar collapseOnSelect inverse>
            <Navbar.Header>
                <img src={logo} alt="" className={"img-responsive"}
                     style={{height: "50px", display: "inline-block", float: "left"}}/>
                <Navbar.Toggle/>
                <Navbar.Text style={{display: "inline-block"}}>
                    <Link to={"/"}>大学物理实验</Link>
                </Navbar.Text>
            </Navbar.Header>
            <Navbar.Collapse>
                {isLoggedIn && userType === 'elder' ?
                    <Nav>
                        <NavItem eventKey={1}><Link to={"/admin/user"}>用户管理</Link></NavItem>
                        <NavItem eventKey={2}><Link to={"/admin/status"}>设备状态</Link></NavItem>
                        <NavItem eventKey={3}><a onClick={() => {
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
                        }}
                        >下载数据</a></NavItem>
                    </Nav> : <React.Fragment/>
                }
                {isLoggedIn ?
                    <Nav pullRight>
                        <NavItem eventKey={4}>你好!&nbsp;{id}&nbsp;<Link to={"/"}
                                                    onClick={() => {
                                                        /*send logout message here*/
                                                        this.props.dispatch(ActionFactory.createUserInfo({}));
                                                        Request.logOut();
                                                    }}>退出</Link></NavItem>
                    </Nav> :
                    <Nav pullRight>
                        <NavItem eventKey={5}><Link to={"/login"}>登录</Link></NavItem>
                    </Nav>
                }
            </Navbar.Collapse>
        </Navbar>);
    }
}

function storeStateToComponentProp(state) {
    //select part of the state it need
    let user = state.userInfo;
    return {
        isLoggedIn: !!(user && user.id),
        id: user ? user.id : null,
        userType: user ? user.type : null,
    };
}

export default connect(storeStateToComponentProp)(SiteHeader);