import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import reducers from './redux/reducers';
import App from './App';
import LoginForm from "./pages/LoginForm";

const browserHistory = createBrowserHistory();

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        ...reducers,
    })
);

// Create an enhanced history that syncs navigation events with the store

class SiteProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={browserHistory}>
                    <App>
                        <Switch>
                            <Route path={"/login"} render={() => <LoginForm/>}/>
                            <Route path={"/admin"}>
                                <div>
                                    <Route path={`/admin/user`} render={() => <div>user</div>}/>
                                    <Route path={"/admin/status"} render={() => <div>status</div>}/>
                                </div>
                            </Route>
                            <Route path={"/user"}>
                                {/*<Route path={"equipment"}/>*/}
                                {/*<Route path={"code"}/>*/}
                                {/*<Route path={"evaluate"}/>*/}
                            </Route>
                        </Switch>
                    </App>
                </Router>
            </Provider>
        );
    }
}

export default SiteProvider;
