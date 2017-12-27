import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import reducers from './redux/reducers';
import LoginForm from './pages/LoginForm';
import App from './App';

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
                    <Route path={"/"}>
                        <App>
                            <Switch>
                                <Route path={"/login"} render={()=><LoginForm/>}/>
                                <Route path={"/admin"}>
                                    {/*<Route path={"user"}/>*/}
                                    {/*<Route path={"status"}/>*/}
                                </Route>
                                <Route path={"/user"}>
                                    {/*<Route path={"equipment"}/>*/}
                                    {/*<Route path={"code"}/>*/}
                                    {/*<Route path={"evaluate"}/>*/}
                                </Route>
                            </Switch>
                        </App>
                    </Route>
                </Router>
            </Provider>
        );
    }
}

export default SiteProvider;
