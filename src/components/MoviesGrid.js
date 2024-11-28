import React, { useState, useEffect } from "react";
import "../styles.css";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  });
  return (
    <div className={"movies-grid"}>
      {movies.map((movie) => (
        <div key={movie.id} className={"movie-card"}>
          <img src={`images/${movie.image}`} alt={movie.title} />
          <div className={"movie-card-info"}>
            <h3 className={"movie-card-title"}>{movie.title}</h3>
            <p className={"movie-card-genre"}>{movie.genre}</p>
            <p className={"movie-card-rating"}>{movie.rating}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
