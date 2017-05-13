'use strict';

import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

import Dashboard from './Dashboard';
import NoMatch from './NoMatch';

import {lazy} from '../utils/lazy';

function lazyLoad(name) {
    return lazy(() => import(`./${name}`));
}

export default class App extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1>App</h1>
                </header>
                <Link to="/">Dashboard</Link>
                <span> | </span>
                <Link to="/no-item">NoItem</Link>
                <span> | </span>
                <Link to="/first-item">FirstItem</Link>
                <span> | </span>
                <Link to="/second-item">SecondItem</Link>
                <hr/>
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/first-item" component={lazyLoad('FirstItem')} />
                    <Route path="/second-item" component={lazyLoad('SecondItem')} />
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}
