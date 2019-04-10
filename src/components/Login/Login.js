import React, { Component } from 'react';
import base64 from 'base-64';

import "./Login.css";
import { Redirect } from 'react-router-dom';

class Login extends Component {
    state = {
        username: "",
        password: "",
        token: "",
        data: null,
        submitted: false
    }

    userInputHandler = () => {
        if (!this.state.username || this.state.username !== "test" ) {
          return false;
        }else if(!this.state.password || this.state.password !== "test"){
          return false;
        }else {
          return true;
        }
    }

    userLoginHandler = (event) => {
        event.preventDefault();
        let inputHandler = this.userInputHandler();
        console.log(inputHandler);
        if (inputHandler) {
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
                  this.setState({submitted: true});
              })
              .catch(err => console.log(err));
        }else {
          alert("Oops, Username or Password are invalid...");
        }
    }

    sendTokenHandler = (event) => {

        const MOVIE_URL = "//wdassignment.devfl.com/api/movies";

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
          <div className="Login">
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
              <input style={{fontFamily: "Helvetica"}} type="submit" value="Log In" />
            </form>
          </div>
        );
        }
}

export default Login;
