import {combineReducers} from 'redux';

export function config(state = {}) {
    return state;
}

export function test(state = {}, action = {}) {
    let nextState;
    const {type = '', payload = {}} = action;

    switch (type) {
    case 'RANDOM':
        nextState = {...state, ...payload};
        break;
    case 'INCREMENT':
        nextState = {...state, ...payload};
        break;
    default:
        nextState = state;
        break;
    }

    return nextState;
}

export default combineReducers({
    config,
    test
});
