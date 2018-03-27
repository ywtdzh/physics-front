import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createBrowserHistory} from 'history';
import reducers from '../redux/reducers';
import App from '../App';
import LoginForm from "../pages/LoginForm";
import RootRouter from './RootRouter';

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
                {RootRouter(browserHistory)}
            </Provider>
        );
    }
}

export default SiteProvider;
