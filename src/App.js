import './jquery-wrapper';
import React, {Component} from 'react';
import 'bootstrap-loader';
import SiteHeader from './public/SiteHeader';

class App extends Component {
    render() {
        return (
            <div className="App">
                <SiteHeader history={this.props.history}/>
                {this.props.children}
            </div>
        );
    }
}

export default App;
