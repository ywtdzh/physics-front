import {Route, Router, Switch} from "react-router-dom";
import App from "../App";
import LoginForm from "../pages/LoginForm";
import React from "react";
import UserManagementPage from "../pages/elder/UserManagementPage";
import AllEquipStatusPage from "../pages/elder/AllEquipStatusPage";
import UserTypeSwitch from "./UserTypeSwitch";
import NaivePage from "../pages/naive/NaivePage";

export default (history) => (<Router history={history}>
    <App>
        <Switch>
            <Route exact path={"/"} render={() => (<UserTypeSwitch/>)}/>
            <Route path={"/login"} render={() => <LoginForm/>}/>
            <Route exact path={`/admin`} render={() => <UserTypeSwitch/>}/>
            <Route path={`/admin/user`} render={() => <UserManagementPage/>}/>
            <Route path={"/admin/status"} render={() => <AllEquipStatusPage/>}/>
            <Route exact path={"/user"} render={() => <NaivePage/>}/>
        </Switch>
    </App>
</Router>);
