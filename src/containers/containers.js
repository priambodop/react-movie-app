import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './containers.css';
import Login from '../components/Login/Login';
import HomePage from '../components/HomePage/HomePage';
import Logout from '../components/Logout/Logout';
import MovieDetails from '../components/MovieDetails/MovieDetails';

class Containers extends Component {
    render() {
        return(
            <div>
            <Route path="/" exact component={Login} />
            <Switch>
                <Route path="/homePage" component={HomePage} />
                <Route path="/logout" component={Logout} />
                <Route path="/homePage/:id" exact component={MovieDetails} />
            </Switch>
            </div>

        );
    }
}

export default Containers;
