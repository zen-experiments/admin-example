'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';

import DashboardComponent from '../components/Dashboard';

class Dashboard extends Component {
    render() {
        return (
            <DashboardComponent {...this.props}/>
        );
    };
}

export default connect((state) => {
    const {test} = state;
    const {a = 0, b = 0} = test;
    return {a, b};
})(Dashboard);
