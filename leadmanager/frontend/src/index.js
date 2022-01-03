import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'
import { Provider } from 'react-redux'
import store from './store'
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from 'react-alert-template-basic'
import { HashRouter } from "react-router-dom";

const options = {
    position: positions.TOP_CENTER,
    timeout: 5000,
    offset: '70px',
    transition: transitions.SCALE
}

ReactDOM.render(
    <HashRouter>
        <AlertProvider template={AlertTemplate} {...options}>
            <Provider store={store}>
                <App />
            </Provider>
        </AlertProvider>
    </HashRouter>,
    document.getElementById('app')
);