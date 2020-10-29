import React, { useState } from "react";
import "./movies.css";
import Movie from "./Movie";

const Movies = () => {
  const [result, setResult] = useState([]);
  const [userInput, setUserInput] = useState("");

  const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

  const url = `https://www.omdbapi.com/?s=${userInput}&apikey=${API_KEY}`;

  const handleInputChnage = (e) => {
    setUserInput(e.target.value);
  };
  const handleError = () => {
    alert("Sorry Could not found");
  };

  const fetchMovieData = async () => {
    const response = await fetch(url);
    const movieData = await response.json();
    if (movieData.Search) {
      setResult(movieData.Search);
    } else {
      handleError();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovieData();
    setUserInput("");
  };

  return (
    <>
      <div>
        <h1 className="heading">Enter the Movie Name</h1>
        <form onSubmit={handleSubmit} className="form-head">
          <input
            type="text"
            onChange={handleInputChnage}
            value={userInput}
            className="input-form"
          />

          <button type="submit" className="input-btn">
            Search
          </button>
        </form>
      </div>
      {result.map((movieValue) => {
        const { Title, Year, Poster, imdbID } = movieValue;
        return (
          <Movie
            Title={Title}
            Year={Year}
            Poster={Poster}
            key={imdbID}
            imdbID={imdbID}
          />
        );
      })}
    </>
  );
};

export default Movies;
