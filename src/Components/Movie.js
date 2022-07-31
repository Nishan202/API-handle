import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h4>{props.title}</h4>
      {/* <h3>{props.releaseDate}</h3> */}
      {/* <p>{props.openingText}</p> */}
      <p>{props.description}</p>
    </li>
  );
};

export default Movie;