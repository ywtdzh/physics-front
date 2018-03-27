import {Route, Router, Switch} from "react-router-dom";
import App from "../App";
import LoginForm from "../pages/LoginForm";
import React from "react";
import CodeEditor from "../pages/naive/CodeEditor";
import UserManagementPage from "../pages/elder/UserManagementPage";

export default (history)=>(<Router history={history}>
    <App>
        <Switch>
            <Route path={"/login"} render={() => <LoginForm/>}/>
            <Route path={"/admin"}>
                <div>
                    <Route path={`/admin/user`} render={() => <UserManagementPage/>}/>
                    <Route path={"/admin/status"} render={() => <div>status</div>}/>
                </div>
            </Route>
            <Route path={"/user"}>
                <CodeEditor/>
                {/*<Route path={"equipment"}/>*/}
                {/*<Route path={"code"}/>*/}
                {/*<Route path={"evaluate"}/>*/}
            </Route>
        </Switch>
    </App>
</Router>);
