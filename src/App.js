import './jquery-wrapper';
import React, {Component} from 'react';
import 'bootstrap-loader';
import SiteHeader from './SiteHeader';

class App extends Component {
    render() {
        return (
            <div className="App">
                <SiteHeader/>
                {this.props.children}
            </div>
        );
    }
}

export default App;
