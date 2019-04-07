import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login/Login';
import HomePage from '../components/HomePage/HomePage';

class Containers extends Component {
    render() {
        return(
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/homePage" component={HomePage} />
            </Switch>
        );
    }
}

export default Containers;
