import React, { Component } from 'react';
import base64 from 'base-64';

import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        username: "",
        password: "",
        token: "",
        data: null,
        submitted: false
    }

    userLoginHandler = (event) => {
        event.preventDefault();

        const POST_URL = "http://wdassignment.devfl.com/api/login";

        const headers = new Headers();

        headers.set('Authorization', 'Basic ' +
        base64.encode(this.state.username + ":" +
        this.state.password));

        fetch(POST_URL,{
            method: 'POST',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("theToken", data.data.token);
                this.setState({data: data});

                // console.log(data);
                // console.log('this is token' + localStorage.getItem("theToken"));

                // this.sendTokenHandler();
                this.setState({submitted: true});
            })
            .catch(err => console.log(err));
    }

    sendTokenHandler = (event) => {

        const MOVIE_URL = "http://wdassignment.devfl.com/api/movies";

        const headers = new Headers();
        const token = this.state.data.data.token;

        headers.set('Authorization', 'Bearer ' + token);

        fetch(MOVIE_URL, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    }

    render() {
        let redirect = null;

        if (this.state.submitted) {
            redirect = <Redirect to="/homePage"/>
        }

        return (
          <div>
            {redirect}
            <form onSubmit={this.userLoginHandler}>
              <p>Username:</p>
              <input type="text"
                onChange={event => this.setState({username: event.target.value})}
                value={this.state.username}/>
              <p>Password:</p>
              <input
                type="password"
                onChange={event => {
                  this.setState({ password: event.target.value });
                }}
                value={this.state.password}
              />
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        );
        }
}

export default Login;
