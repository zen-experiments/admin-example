import {createStore, applyMiddleware, compose} from 'redux';

/**
Redux Dev. Middleware - necessary for Chrome Redux Extension
integration.

Must be included LAST in `compose`!
**/

let devToolsMiddleware = function() {
    return createStore;
};

if (window.devToolsExtension) {
    devToolsMiddleware = window.devToolsExtension();
}

const devMiddleware = compose(
    devToolsMiddleware
);

function createThunkMiddleware(injected) {
    return ({dispatch, getState}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState, injected);
            }

            return next(action);
        };
    };
};

function customMiddleware(/* store */) {
    return (next) => (action) => {
        next(action);
    };
};

export default compose(
    applyMiddleware(
        createThunkMiddleware(),
        customMiddleware
    ),
    devMiddleware
);
