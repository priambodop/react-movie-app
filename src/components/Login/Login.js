import React, { Component } from 'react';
import base64 from 'base-64';

class Login extends Component {
    state = {
        username: "",
        password: "",
        data: null
    }

    userLoginHandler = (event) => {
        event.preventDefault();

        const POST_URL = "http://wdassignment.devfl.com/api/login";

        const headers = new Headers();
        headers.set('Authorization', 'Basic ' + base64.encode(this.state.username + ":" + this.state.password));

        fetch(POST_URL,{
            method: 'POST',
            headers: headers
        })
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("theData", data);
                console.log(localStorage.getItem("theData"));
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
          <div>
            <form onSubmit={this.userLoginHandler}>
              <p>Username:</p>
              <input type="text" />
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