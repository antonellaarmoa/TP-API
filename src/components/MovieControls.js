import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const MovieControls = ({ type, movie }) => {
  const userId = localStorage.getItem('userId');
    const {
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
        removeMovieFromFavorite,
        addMovieToFavorite
    } = useContext(GlobalContext);


    const handleRemoveFromWatchlist = () => {
        removeMovieFromWatchlist(userId, movie.movie_id,"rem"); 
    };

    const handleRemoveFromWatched = () => {
      removeFromWatched(userId, movie.movie_id); 
  };

    const handleMoveToWatchlist = () => {
        moveToWatchlist(movie.id); 
    };
    
    const handleRemoveFromFavorite = () => {
      removeMovieFromFavorite(userId, movie.movie_id); 
  };


  return (
    <div className="card-controls">
      {type === "watchlist" && (
        <>
         
          <button className="ctrl-btn" onClick={handleRemoveFromWatchlist}>
            <i className="fa-fw fa fa-times"></i>
          </button>
          
        </>
      )}
      {type === "watched" && (
        <>
          
          <button className="ctrl-btn" onClick={handleRemoveFromWatched}>
            <i className="fa-fw fa fa-times"></i>
          </button>
          
        </>
      )}

      {type === "favorites" && (
        <>
          <button className="ctrl-btn" onClick={ handleRemoveFromFavorite}>
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};
