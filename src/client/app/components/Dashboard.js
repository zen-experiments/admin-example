'use strict';

import React, {Component} from 'react';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch({type: 'RANDOM', payload: {a: Math.random()}});
        this.props.dispatch({type: 'INCREMENT', payload: {b: this.props.b + 1}});
    }

    render() {
        return (
            <div>
                <h3>Dashboard Random # {this.props.a}</h3>
                <h3>Dashboard Sequence # {this.props.b}</h3>
                <button onClick={this.onClick}>Dispatch</button>
            </div>
        );
    };
}
