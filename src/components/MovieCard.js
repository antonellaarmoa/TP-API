import React from "react";
import { MovieControls } from "./MovieControls";
import { Link } from "react-router-dom";



export const MovieCard = ({ movie, type }) => {
  const handleCardClick = () => {
    console.log(`Título de la película: ${movie.title}`);
    console.log(`iddetail: ${movie.movie_id}`);
   
  };
  return (
    <div className="movie-card" onClick={handleCardClick}>
   
      <div className="overlay">  </div>
      
      
      <Link to={`/movie/${movie.movie_id}`} style={{ textDecoration: "none", color: "white" }}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""} ` } alt=""/>
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                    
                </div>
                
                
            </div>
            
            
        </Link>

        
        <div className="controles"><MovieControls type={type} movie={movie} /></div>
     
    </div>

    
    
    
    
  );
};
