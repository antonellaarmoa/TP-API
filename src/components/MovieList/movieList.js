import React, { useState, useEffect } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";




const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { type } = useParams();
  

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=d2fc8ccb1e7a6405789c65213a8efdb3&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovieList(data.results))
      .catch((error) => console.log(error));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = searchTerm
    ? movieList.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movieList;

  return (
    <div className="movie__list">
     
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
     
      {filteredMovies.length === 0 ? (
        <h2>No hay películas disponibles, Intenta con otro nombre</h2>
      ) : (
        <div className="list__cards">
          {filteredMovies.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;