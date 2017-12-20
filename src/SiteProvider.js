import React, {Component} from 'react';
import {Router, Route} from 'react-router-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';
import {createBrowserHistory} from 'history';

import reducers from './reducers';
import LoginForm from './pages/LoginForm';
import App from './App';

const browserHistory = createBrowserHistory();

// Add the reducer to your store on the `routing` key
const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

export default class SiteProvider extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <Route path={"/"} component={App}>
                        <Route path={"login"} component={LoginForm}/>
                        <Route path={"admin"}>
                            <Route path={"user"}/>
                            <Route path={"status"}/>
                        </Route>
                        <Route path={"user"}>
                            <Route path={"equipment"}/>
                            <Route path={"code"}/>
                            <Route path={"evaluate"}/>
                        </Route>
                        {/*todo change altHandler to route*/}
                    </Route>
                </Router>
            </Provider>
        );
    }
}