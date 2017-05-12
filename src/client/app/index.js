'use strict';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'

import App from './App';

function renderApp() {
    render(
        <AppContainer>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
    );
}

if (module.hot) {
    module.hot.accept('./App', () => {
        renderApp();
    });
}

renderApp();
