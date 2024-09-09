import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { AuthContext } from "../../src/UserContexr/authContext";
import Axios from "axios";

export const ResultCard = ({ movie }) => {
  const {
    addMovieToWatchlist,
    addMovieToWatched,
    addMovieToFavorite,
    removeMovieFromWatchlist,
    removeMovieFromFavorite,
    removeFromWatched,
    watched,
    watchlist,
    favorites,
  } = useContext(GlobalContext);

  const { isLoggedIn } = useContext(AuthContext);
  const [userWatchlist, setUserWatchlist] = useState([]);
  const [userWatched, setUserWatched] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const fetchUserLists = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const [watchlistResponse, watchedResponse, favoritesResponse] = await Promise.all([
            Axios.get(`http://localhost:3002/user/${userId}/movies/watchlist`),
            Axios.get(`http://localhost:3002/user/${userId}/movies/watched`),
            Axios.get(`http://localhost:3002/user/${userId}/movies/favorites`),
          ]);

          setUserWatchlist(watchlistResponse.data);
          setUserWatched(watchedResponse.data);
          setUserFavorites(favoritesResponse.data);
        } catch (error) {
          console.error('Error fetching lists:', error);
        }
      }
    };

    fetchUserLists();
  }, []);

  const movieInUserWatchlist = movie && userWatchlist.find((o) => o.movie_id === movie.id);
  const movieInUserWatched = movie && userWatched.find((o) => o.movie_id === movie.id);
  const movieInUserFavorites = movie && userFavorites.find((o) => o.movie_id === movie.id);

  const handleAddToWatchlist = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        const confirmed = window.confirm(`Do you want to add "${movie.title}" to your watchlist?`);
        if (confirmed) {
          await addMovieToWatchlist(movie);
          const response = await Axios.get(`http://localhost:3002/user/${userId}/movies/watchlist`);
          setUserWatchlist(response.data);
        }
      } catch (error) {
        console.error('Error adding movie to watchlist:', error);
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        await removeMovieFromWatchlist(userId, movie.id);
        const response = await Axios.get(`http://localhost:3002/user/${userId}/movies/watchlist`);
        setUserWatchlist(response.data);
      } catch (error) {
        console.error('Error removing movie from watchlist:', error);
      }
    }
  };

  const handleAddToWatched = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        const confirmed = window.confirm(`Do you want to add "${movie.title}" to your watched list?`);
        if (confirmed) {
          if (movieInUserWatchlist) {
            await handleRemoveFromWatchlist();
          }
          await addMovieToWatched(movie);
          const response = await Axios.get(`http://localhost:3002/user/${userId}/movies/watched`);
          setUserWatched(response.data);
        }
      } catch (error) {
        console.error('Error adding movie to watched list:', error);
      }
    }
  };

  const handleRemoveFromWatched = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        await removeFromWatched(userId, movie.id);
        const response = await Axios.get(`http://localhost:3002/user/${userId}/movies/watched`);
        setUserWatched(response.data);
      } catch (error) {
        console.error('Error removing movie from watched list:', error);
      }
    }
  };

  const handleMoveToWatchlist = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        if (movieInUserWatched) {
          await removeFromWatched(userId, movie.id);
        }
        await addMovieToWatchlist(movie);
        const [watchlistResponse, watchedResponse] = await Promise.all([
          Axios.get(`http://localhost:3002/user/${userId}/movies/watchlist`),
          Axios.get(`http://localhost:3002/user/${userId}/movies/watched`),
        ]);
        setUserWatchlist(watchlistResponse.data);
        setUserWatched(watchedResponse.data);
      } catch (error) {
        console.error('Error moving movie to watchlist:', error);
      }
    }
  };

  const handleAddToFavorites = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        await addMovieToFavorite(movie);
        const response = await Axios.get(`http://localhost:3002/user/${userId}/movies/favorites`);
        setUserFavorites(response.data);
      } catch (error) {
        console.error('Error adding movie to favorites:', error);
      }
    }
  };

  const handleRemoveFromFavorites = async () => {
    const userId = localStorage.getItem('userId');
    if (userId && movie) {
      try {
        await removeMovieFromFavorite(userId, movie.id);
        const response = await Axios.get(`http://localhost:3002/user/${userId}/movies/favorites`);
        setUserFavorites(response.data);
      } catch (error) {
        console.error('Error removing movie from favorites:', error);
      }
    }
  };

  return (
    <div className="result-card">
      <div className="info">
        <div className="controls">
          {isLoggedIn && movie && (
            <>
              {!movieInUserWatchlist ? (
                <>
                  {!movieInUserWatched ? (
                    <button
                      className="btn"
                      disabled={!!movieInUserWatched}
                      onClick={handleAddToWatchlist}
                    >
                      Add to Watchlist
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={handleMoveToWatchlist}
                    >
                      Move to Watchlist
                    </button>
                  )}
                </>
              ) : (
                <button
                  className="btn"
                  onClick={handleRemoveFromWatchlist}
                >
                  Remove from Watchlist
                </button>
              )}

              {!movieInUserWatched ? (
                <button
                  className="btn"
                  disabled={!!movieInUserWatched}
                  onClick={handleAddToWatched}
                >
                  Add to Watched
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={handleRemoveFromWatched}
                >
                  Remove from Watched
                </button>
              )}

              <button
                className="btn"
                onClick={movieInUserFavorites ? handleRemoveFromFavorites : handleAddToFavorites}
              >
                {movieInUserFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
