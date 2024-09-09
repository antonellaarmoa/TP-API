import React, {useState, useEffect} from 'react';
import axios from "axios";
import Chip from "@material-ui/core/Chip";

const Genres = ({ genres, setGenres , selectedGenres, setSelectedGenres}) => {

  const fetchGenres = async () => {
     const {data} = await axios.get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=d2fc8ccb1e7a6405789c65213a8efdb3&language=en-US'
    );
    setGenres(data?.genres);
  };

  useEffect(()=>{
    fetchGenres();
  },[]);

  const handleAddGenres = genre => {
  setSelectedGenres([...selectedGenres, genre])
  setGenres(genres?.filter(g => g?.id !== genre.id));
  };

  const handleRemoveGenres = genre => {
    setSelectedGenres(
      selectedGenres?.filter(selected => selected?.id !== genre.id)
    );
    setGenres([...genres, genre]);
    };



  return (
     
    <div className= "genre-menu"  >
        {selectedGenres?.map(genre=>(
          <Chip 
          onDelete={() => handleRemoveGenres(genre)}
          style={{color:"gray" }} 
          clickable
          label={genre?.name}
          />
        ))}

      {genres?.map(genre => (
        <Chip
        onClick ={() => handleAddGenres(genre)}
        clickable
          key={genre.id}
          style={{ fontSize: "1.2em", margin: "3px" }}
          label={genre?.name} 
          color="secondary"
        />
      ))}

    </div>
  );
};

export default Genres