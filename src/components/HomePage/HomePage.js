import React, { Component } from 'react';

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
            if (i !== 4) {
                URL = `http://wdassignment.devfl.com/api/movie?id=${i}%3Chttp://wdassignment.devfl.com/api/movie?id=%7BmovieId%7D%3E`;

                fetch(URL, {
                    method: 'GET',
                    headers: headersMovies
                })
                .then(theResponse => theResponse.json())
                .then(theData => {
                    console.log(theData.data.name);
                    listMovies.push(theData);

                });
            }
        }

        this.setState({movies: listMovies});
        console.log(this.state.movies);
    }



    render() {

        let allMovies = <p>Loading...</p>;

        if (this.state.movies !== null) {
            allMovies = this.state.movies.map(movie => {
                return (
                    <Movie
                        name={movie.data.name}
                        description={movie.data.description}
                    />
                );
            });

        }
        console.log(allMovies);

        return(
            <section className="Home">
                {allMovies}
                <Movie name="mama"
                />
            </section>
        );
    }
}

export default HomePage;
