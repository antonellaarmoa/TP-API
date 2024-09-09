import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import video from '../assets/video.mp4';
import Genres from "./Genres/Genres";
import GenresIDs from "./Genres/GenresIDs";
import Card from "./card/card";
import "./Explore.css";


const Explore = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");

  const fetchMovies = async () => {
    try {
      let url = "https://api.themoviedb.org/3/discover/movie";
      
      const params = {
        api_key: "d2fc8ccb1e7a6405789c65213a8efdb3",
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: true,
        page: 1,
      };

      if (selectedGenres.length > 0) {
        params.with_genres = GenresIDs(selectedGenres);
      }

      if (searchTitle) {
        params.query = encodeURIComponent(searchTitle);
        url = "https://api.themoviedb.org/3/search/movie";
      }

      const { data } = await axios.get(url, { params });

      if (data.results.length === 0) {
        setMovies([]);
        setLoading(false);
        return;
      }

      setMovies(data.results);
      setLoading(false);
    } catch (error) {
      console.error("Error al buscar películas:", error);
      setIsErr(true);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedGenres, searchTitle]);

  return (
    <div className="explore-page-container"> 
      <div className="videoDiv"> 
      <video src={video} autoPlay muted loop></video>
      <div className="textDiv">
            <h2 className='title'>Explore Movies</h2>
          </div>
        <hr className="line-explore"></hr> 
      </div>
      
      <div className="container-explore">
        <div className="search-container"> 
          <div className="search-bar-container"> 
            <i className="fa fa-search"></i>
            <input
              className="search-bar"
              type="text"
              placeholder="Search movie by title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <hr className="line-explore-genre"></hr>
          <h3>Search movie by genre</h3>
          <Genres
            genres={genres}
            setGenres={setGenres}
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres} 
          />
          {loading ? (
            <p>Loading...</p>
          ) : movies.length === 0 ? (
            <p className="no-movies-message">Oops! There are no movies available for the selected genres.</p>
          ) : (
            <Grid container>
              {movies.map(movie => (
                <Grid key={movie.id}>
                  <Card movie={movie}/>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;