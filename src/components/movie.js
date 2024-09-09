import React, {useEffect, useState} from "react"
import "./movie.css"
import Footer from "./footer/footer";
import { useParams } from "react-router-dom";
import { ResultCard } from "./ResultCard";

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()
    console.log(id,"id movie.js")

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    return (
        
        <div className="all-detail-page"> 
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt=""/>
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}` } alt=""/>
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{ currentMovieDetail? currentMovieDetail.title:''}</div>
                        
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Sinopsis</div>
                        <div className="synopsis-from-movie">{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>

                    <ResultCard movie={currentMovieDetail && currentMovieDetail.id ? currentMovieDetail : null} />
                    <div>
                    
                    </div>
                    

                    
                </div>
                
            </div>
            
            
            
        </div>
    <Footer /> 
    
    </div>

        

    )
}

export default Movie