import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { MovieCard } from "./MovieCard";
import Axios from "axios";

export const Watchlist = () => {
  const { watchlist } = useContext(GlobalContext);
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      Axios.get(`http://localhost:3002/user/${userId}/movies/watchlist`)
        .then((response) => {
          setUserMovies(response.data);
      
        })
        .catch((error) => {
          console.error('Error fetching watchlist:', error);
        });
    }
  }, []);

  return (
    <div className="movie-page">
      <div className="container-listas">
        <div className="watchlist-container">
          <div className="header">
            <h1 className="heading">{localStorage.getItem('username')}'s Watchlist</h1>
            <span className="count-pill">
              {userMovies.length} {userMovies.length === 1 ? "Movie" : "Movies"}
            </span>
          </div>

          {userMovies.length > 0 ? (
            <div className="movie-grid">
              {userMovies.map((movie) => (
                <MovieCard movie={movie} key={movie.id} type="watchlist" />
              ))}
            </div>
          ) : (
            <h2 className="no-movies">No movies in your list! Add some!</h2>
          )}
        </div>
      </div>
    </div>
  );
};
