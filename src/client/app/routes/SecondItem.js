'use strict';

import React, {Component} from 'react';
import {Switch, Route, Link} from 'react-router-dom';

class Inner extends Component {
    render() {
        return (
            <section>
                <strong>Inner</strong>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>
        );
    }
}

export default class SecondItem extends Component {
    render() {
        const {url} = this.props.match;
        const inner = `${url}/inner`;

        return (
            <div>
                <h3>SecondItem</h3>
                <Link to={inner}>Inner</Link>
                <div>
                    <Switch>
                        <Route exact path={inner} component={Inner}/>
                        <Route exact path={url} render={() => (
                            <h3>Please select a topic.</h3>
                        )}/>
                        <Route render={() => (
                            <h3>Ooops.</h3>
                        )}/>
                    </Switch>
                </div>
            </div>
        );
    }
}
