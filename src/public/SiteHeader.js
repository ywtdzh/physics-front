import React, {Component} from 'react';
import {Navbar} from "react-bootstrap";
import SiteCollapse from './SiteCollapse';
import logo from '../logo.svg';
import {Link} from "react-router-dom";

class SiteHeader extends Component {
    render() {
        return (<Navbar collapseOnSelect inverse>
            <Navbar.Header>
                <img src={logo} alt="" className={"img-responsive"}
                     style={{height: "50px", display: "inline-block", float: "left"}}/>
                <Navbar.Toggle/>
                <Navbar.Text style={{display: "inline-block"}}>
                    <Link to={"/"}>大学物理实验</Link>
                </Navbar.Text>
            </Navbar.Header>
            <SiteCollapse/>
        </Navbar>);
    }
}

export default SiteHeader;