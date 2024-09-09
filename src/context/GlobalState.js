import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import Axios from "axios";

const initialState = {
  watchlist: [],
  watched: [],
  favorites: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    const fetchUserLists = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const watchlistResponse = await Axios.get(`http://localhost:3002/user/${userId}/movies/watchlist`);
          const watchedResponse = await Axios.get(`http://localhost:3002/user/${userId}/movies/watched`);
          const favoritesResponse = await Axios.get(`http://localhost:3002/user/${userId}/movies/favorites`);

          dispatch({ type: 'SET_WATCHLIST', payload: watchlistResponse.data });
          dispatch({ type: 'SET_WATCHED', payload: watchedResponse.data });
          dispatch({ type: 'SET_FAVORITES', payload: favoritesResponse.data });
        } catch (error) {
          console.error('Error fetching user lists:', error);
        }
      }
    };

    fetchUserLists();
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state]);

  const addMovieToWatchlist = async (movie) => {
    try {
      const userId = localStorage.getItem('userId');

      await Axios.post(`http://localhost:3002/watchlist`, {
        userId: userId,
        movieId: movie.id,
      });

      dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
      alert(`"${movie.title}" has been added to your watchlist`);
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
    }
  };

  const removeMovieFromWatchlist = async (userId, movieId) => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}/watchlist/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: movieId });
        alert(`Movie removed successfully from watchlist`);
      } else {
        console.error('Error removing movie from watchlist');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addMovieToFavorite = async (movie) => {
    try {
      const userId = localStorage.getItem('userId');

      await Axios.post(`http://localhost:3002/favorites`, {
        userId: userId,
        movieId: movie.id,
      });

      dispatch({ type: 'ADD_MOVIE_TO_FAVORITE', payload: movie });
      alert(`"${movie.title}" has been added to your favorites`);
    } catch (error) {
      console.error('Error adding movie to favorites:', error);
    }
  };

  const removeMovieFromFavorite = async (userId, movieId) => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}/favorites/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch({ type: 'REMOVE_MOVIE_FROM_FAVORITE', payload: movieId });
        alert(`Movie removed successfully from favorites`);
      } else {
        console.error('Error removing movie from favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addMovieToWatched = async (movie) => {
    try {
      const userId = localStorage.getItem('userId');

      await Axios.post(`http://localhost:3002/watched`, {
        userId: userId,
        movieId: movie.id,
      });

      dispatch({ type: 'ADD_MOVIE_TO_WATCHED', payload: movie });
      alert(`"${movie.title}" has been added to your watched`);
    } catch (error) {
      console.error('Error adding movie to watched:', error);
    }
  };

  const removeFromWatched = async (userId, movieId) => {
    try {
      const response = await fetch(`http://localhost:3002/user/${userId}/watched/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        dispatch({ type: 'REMOVE_FROM_WATCHED', payload: movieId });
        alert(`Movie removed successfully from watched`);
      } else {
        console.error('Error removing movie from watched');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const moveToWatchlist = async (movie) => {
    try {
      const userId = localStorage.getItem("userId");

      await Axios.delete(`http://localhost:3002/user/${userId}/movies/${movie.id}/watched`);

      await Axios.post("http://localhost:3002/watchlist", {
        userId: userId,
        movieId: movie.id,
      });

      dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
      alert(`"${movie.title}" has been moved to watchlist`);
    } catch (error) {
      console.error("Error moving movie to watchlist:", error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        favorites: state.favorites,
        addMovieToFavorite,
        removeMovieFromFavorite,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
