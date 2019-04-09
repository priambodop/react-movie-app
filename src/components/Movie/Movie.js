import React from 'react';
import './Movie.css';

const movie = (props) => {
        return(
            <article className="Movie" onClick={props.clicked}>
                <h1>{props.name}</h1>
            </article>
        );

};

export default movie;
