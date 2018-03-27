import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SiteProvider from './public/SiteProvider';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SiteProvider />, document.getElementById('root'));
registerServiceWorker();
