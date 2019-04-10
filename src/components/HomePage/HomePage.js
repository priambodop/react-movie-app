import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';

import MovieDetails from '../MovieDetails/MovieDetails';
import Movie from '../Movie/Movie';
import './HomePage.css';


class HomePage extends Component {
    state = {
        movies: null
    }

    componentDidMount(){
        const MOVIE_URL = "http://wdassignment.devfl.com/api/movies";

        const headers = new Headers();
        const token = localStorage.getItem("theToken");

        headers.set('Authorization', 'Bearer ' + token);

        fetch(MOVIE_URL, {
            method: 'GET',
            headers: headers
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.fetchMovieDetailHandler();
        });
    }

    fetchMovieDetailHandler = () => {
        let URL = '';

        const headersMovies = new Headers();
        const tokenMovies = localStorage.getItem("theToken");

        let listMovies = [];
        headersMovies.set('Authorization', 'Bearer ' + tokenMovies);

        for (var i = 1; i <= 5; i++) {
            // if (i !== 4) {
                URL = `http://wdassignment.devfl.com/api/movie?id=${i}%3Chttp://wdassignment.devfl.com/api/movie?id=%7BmovieId%7D%3E`;

                // fetch(URL, {
                //     method: 'GET',
                //     headers: headersMovies
                // })
                // .then(theResponse => theResponse.json())
                // .then(theData => {
                //     console.log(theData.data.name);
                //     listMovies.push(theData);
                //
                // });

                listMovies.push(fetch(URL, {
                    method: 'GET',
                    headers: headersMovies
                }).then(response => response.json())
                );
            // }
        }

        Promise.all(listMovies).then((data) => {
          console.log(data);
          console.log();

          // let newData = data.map((response) => {
          //   if (response.status === "ok") {
          //     console.log(response.data);
          //     return response.data;
          //   } else {
          //     return null;
          //   }
          // })

            this.setState({movies: data});
        });
    }

    movieSelectedHandler = (id) => {
      this.props.history.push('/homePage/' + id);
    }



    render() {

        let allMovies = <p>Loading...</p>;

        if (this.state.movies !== null) {
            allMovies = this.state.movies.map(movie => {
              if (movie.status === 'error') {
                return (
                    <Movie
                        name={movie.status}
                        description={movie.message}

                    />
                );
              }else {
                return (
                    <Movie
                        name={movie.data.name}
                        description={movie.data.description}
                        clicked={() => this.movieSelectedHandler(movie.data.id)}
                    />
                );
              }
            });

        }
        // console.log(allMovies);

        return(
          <div>
          <header className="Home">
                  <nav>
                      <ul>
                          <li><NavLink
                              to="/HomePage"
                              exact
                              activeClassName="my-active"
                              activeStyle={{
                                  color: '#fa923f',
                                  textDecoration: 'underline'
                              }}>Home</NavLink></li>
                          <li><NavLink to="/logout" >Log Out</NavLink></li>
                      </ul>
                  </nav>
            </header>

            <section className="Home">
                {allMovies}
            </section>

            <Route path={this.props.match.url + '/:id'} exact component={MovieDetails}/>
          </div>
        );
    }
}

export default HomePage;
