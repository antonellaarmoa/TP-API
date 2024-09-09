import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingSkeleton(false); 
        }, 1500);
    }, []);

    const handleImageLoad = () => {
        setIsLoadingImage(false); 
    };

    const showSpinner = isLoadingSkeleton || isLoadingImage;

    return (
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
            <div className="cards">
                {isLoadingSkeleton && (
                    <SkeletonTheme color="#202020" highlightColor="#444">
                        <Skeleton height={300} duration={2} />
                    </SkeletonTheme>
                )}
                <div className="loading-spinner" style={{ display: showSpinner ? "flex" : "none" }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: "3em", color: "grey" }} />
                </div>
                <img
                    className="cards__img"
                    src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`}
                    alt=""
                    onLoad={handleImageLoad} 
                    style={{ display: isLoadingSkeleton ? "none" : "block" }}
                    onError={() => setIsLoadingImage(false)} 
                />
                <div className="cards__overlay">
                    <div className="card__title">{movie ? movie.original_title : ""}</div>
                    <div className="card__runtime">
                        {movie ? movie.release_date : ""}
                        <span className="card__rating">
                            {movie ? movie.vote_average : ""}
                            <i className="fas fa-star" />
                        </span>
                    </div>
                    <div className="card__description">{movie ? `${movie.overview.slice(0, 118)}...` : ""}</div>
                </div>
            </div>
        </Link>
    );
};

export default Cards;
