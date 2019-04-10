import React, { Component } from 'react';

import './MovieDetails.css';

class MovieDetails extends Component {
  state= {
    loadedMovies: null
  }

  componentDidMount() {
    this.loadData();
  }

  loadData(){
    let URL = '';

    const headersMovies = new Headers();
    const tokenMovies = localStorage.getItem("theToken");

    let listMovies = [];
    headersMovies.set('Authorization', 'Bearer ' + tokenMovies);

    for (var i = 1; i <= 5; i++) {
            URL = `http://wdassignment.devfl.com/api/movie?id=${i}%3Chttp://wdassignment.devfl.com/api/movie?id=%7BmovieId%7D%3E`;

            listMovies.push(fetch(URL, {
                method: 'GET',
                headers: headersMovies
            }).then(response => response.json())
            );
    }

    Promise.all(listMovies).then((data) => {
        this.setState({loadedMovies: data});

    });
  }

  showTheMovies = (id) => {
    let loadedMoviesHolder = this.state.loadedMovies;
    let text = "";
    let obj = null;
    let pickedMovie = loadedMoviesHolder.filter((movie) => {
      if (movie.status !== 'error' && movie.data.id == id) {
        return movie
      }
    });

    return pickedMovie;
  }

  render(){
    let movie = <p style={{textAlign: 'center'}}>Please wait...</p>;

    let myMovie = "";

    if (this.state.loadedMovies) {
      myMovie = this.showTheMovies(this.props.match.params.id);
      movie = (
        <div className="MovieDetails">
            <h1>{myMovie[0].data.name}</h1>
            <p>{myMovie[0].data.description}</p>
        </div>
      );
    }

    return movie;
  }
}

export default MovieDetails;
