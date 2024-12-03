import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All Ratings");
  useEffect(() => {
    fetch("movies.json")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      });
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesGenre = (movie, genre) =>
    genre === "All Genres" ||
    movie.genre.toString().toLowerCase() === genre.toString().toLowerCase();

  const matchesSearchTerm = (movie, searchTerm) =>
    movie.title
      .toString()
      .toLowerCase()
      .includes(searchTerm.toString().toLowerCase());

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All Ratings":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      matchesGenre(movie, genre) &&
      matchesRating(movie, rating) &&
      matchesSearchTerm(movie, searchTerm),
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm} // every type will trigger event which will change state which will re-render page, set value here to not clear text input on rerender
        onChange={handleSearchChange}
      />
      <div className={"filter-bar"}>
        <div className={"filter-slot"}>
          <label>Genre</label>
          <select
            className={"filter-dropdown"}
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>
        <div className={"filter-slot"}>
          <label>Rating</label>
          <select
            className={"filter-dropdown"}
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All Ratings</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className={"movies-grid"}>
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
