import React, { Component } from 'react';

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
    let pickedID = this.props.match.params.id;
    console.log(pickedID);
    let loadedMoviesHolder = this.state.loadedMovies;
    let pickedMovie = loadedMoviesHolder.filter(movie => {
      if (movie.status !== 'error' && movie.data.id === id) {
        return movie
      }
    });
    console.log(pickedMovie);
    console.log(loadedMoviesHolder);

    return pickedMovie;
  }

  render(){
    let movie = <p style={{textAlign: 'center'}}>Please select a Movie!</p>;

    let myMovie = "";

    if (this.state.loadedMovies) {
      myMovie = this.showTheMovies(this.props.match.params.id);
      movie = (
        <div>
          <h1>{myMovie.name}</h1>
          <p>{myMovie.description}</p>
        </div>
      );
    }

    return movie;
  }
}

export default MovieDetails;
