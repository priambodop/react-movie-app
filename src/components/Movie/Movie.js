import React from 'react';
import './Movie.css';

const movie = (props) => {
        return(
            <article className="Movie">
                <h1>Title: {props.name}</h1>
                <div>Description: {props.description}</div>
            </article>
        );

};

export default movie;
