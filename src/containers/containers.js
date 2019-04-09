import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login/Login';
import HomePage from '../components/HomePage/HomePage';
import Logout from '../components/Logout/Logout';

class Containers extends Component {
    render() {
        return(
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/homePage" component={HomePage} />
                <Route path="/logout" component={Logout} />
            </Switch>
        );
    }
}

export default Containers;
