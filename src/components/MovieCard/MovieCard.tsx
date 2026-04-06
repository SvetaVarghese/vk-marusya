import { Link } from "react-router-dom";
import type { Movie } from "../../types/movie"
import "./MovieCard.css"
import { useState } from "react";

interface MovieCardProps {
    movie: Movie;
    rank?: number;
}

export const MovieCard = ({ movie, rank}: MovieCardProps) => {

    const [errorPoster, setErrorPoster] = useState(false)

    return (
        <Link className="movie-card" to={`/movie/${movie.id}`}>
            {rank && <span className="movie-card__rank">{rank}</span>}
            
            {!errorPoster && movie.posterUrl ? (
                <img className="movie-card__img" 
                    src={movie.posterUrl}
                    alt={movie.title}
                    width={224} height={336}
                    onError={() => setErrorPoster(true)}
                />
            ) : (
                <div className="movie-card__fallback">
                    <span className="movie-card__fallback-title">
                        {movie.title}
                    </span>
                </div>
            )}
            
        </Link>
    )
}