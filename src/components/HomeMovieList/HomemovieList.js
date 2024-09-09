import React, { useState, useEffect } from "react";
import "./HomemovieList.css";
import { useParams } from "react-router-dom";
import Cards from "../../../src/components/card/card";

const HomeMovieList = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    getPopularMovies();
    getTopRatedMovies();
    getUpcomingMovies();
  }, []);

  const getPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=d2fc8ccb1e7a6405789c65213a8efdb3&language=en-US&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results.slice(0, 5)))
      .catch((error) => console.log(error));
  };

  const getTopRatedMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=d2fc8ccb1e7a6405789c65213a8efdb3&language=en-US&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setTopRatedMovies(data.results.slice(0, 5)))
      .catch((error) => console.log(error));
  };

  const getUpcomingMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=d2fc8ccb1e7a6405789c65213a8efdb3&language=en-US&page=1&include_adult=false`
    )
      .then((res) => res.json())
      .then((data) => setUpcomingMovies(data.results.slice(0, 5)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="movie__list">
      <div>
        <h2 className="list__title">Popular</h2>
        <div className="list__cards">
          {popularMovies.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="list__title">Top Rated</h2>
        <div className="list__cards">
          {topRatedMovies.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="list__title">Upcoming</h2>
        <div className="list__cards">
          {upcomingMovies.map((movie) => (
            <Cards key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMovieList;
