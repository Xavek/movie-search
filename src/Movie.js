import React, { useState } from "react";
import "./movie.css";

const MovieInside = (props) => {
  const {
    imdbRating,
    Runtime,
    Released,
    Plot,
    Language,
    Genre,
    Actors,
    Director,
  } = props.movieinsideDetails;
  return (
    <div className="info-container">
      <p className="info-plot">{Plot}</p>
      <p className="info-genre">
        <span className="span-genre">Genre:</span>
        {Genre}
      </p>
      <p className="info-lang">
        <span className="span-lang">Languages:</span>
        {Language}
      </p>
      <p className="info-rating">
        <span className="span-rating">IMDB Rating:</span>
        {imdbRating}
      </p>
      <p className="info-actors">
        <span className="span-actor">Actors:</span>
        {Actors}
      </p>
      <p className="info-time">
        <span className="span-duration">Duration:</span>
        {Runtime}
      </p>
      <p className="info-released">
        <span className="span-relsd">Released Date:</span>
        {Released}
      </p>
      <p className="info-director">
        <span className="span-director">Director:</span>
        {Director}
      </p>
    </div>
  );
};

const Movie = ({ Title, Year, Poster, imdbID }) => {
  const [btn, setBtn] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const fetchMovieDetails = async (movieRef) => {
    
    const url2 = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieRef}`;
    const response = await fetch(url2);
    const moreDetails = await response.json();

    setMovieInfo(moreDetails);
  };

  const handleClickMore = (myvalue) => {
    fetchMovieDetails(myvalue);
    setBtn(!btn);
  };

  return (
    <div className="movie-container">
      <img src={Poster} alt={Title} />
      <div className="movie-inner">
        <h2 className="hero-title">{Title}</h2>
        <h5 className="hero-year">{Year}</h5>

        <button className="hero-btn" onClick={() => handleClickMore(imdbID)}>
          {btn ? "Less" : "More"}
        </button>

        {btn && <MovieInside movieinsideDetails={movieInfo} />}
      </div>
    </div>
  );
};

export default Movie;
