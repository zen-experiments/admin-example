'use strict';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import {AppContainer} from 'react-hot-loader'

import {Provider} from 'react-redux';

import store from './state/';

import App from './routes/App';

function renderApp() {
    render(
            <AppContainer>
                <BrowserRouter>
                    <Provider store={store}>
                        <App />
                    </Provider>
                </BrowserRouter>
            </AppContainer>,
        document.getElementById('root')
    );
}

if (module.hot) {
    module.hot.accept('./routes/App', () => {
        renderApp();
    });
}

renderApp();
