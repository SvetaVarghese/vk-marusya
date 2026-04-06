import "./MovieView.css"
import "../../index.css"
import "../../components/Modals/modal.css"
import LikeIcon from "../../assets/svg/like-icon.svg?react"
import ShuffleIcon from "../../assets/svg/shuffle-icon.svg?react"
import StarIcon from "../../assets/svg/star-icon.svg?react"
import MovieProjector from "../../assets/svg/film-projector.svg?react"
import CloseIcon from "../../assets/svg/modal-close-icon.svg?react"
import { splitGenres } from "../../utils/genres";
import { useUser } from "../../hooks/useUser";
import { addToFavorites, deleteFromFavorites } from "../../api/user";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getEmbedURL } from "../../utils/getEmbedURL";
import { getRatingColor } from "../../utils/getRatingColor";
import type { User } from "../../types/user"
import type { Movie } from "../../types/movie";

interface MovieViewProps {
    movie: Movie;
    showShuffle?: boolean;
    showAbout?: boolean;
    onShuffle?: () => void;
    onRequireAuth?: () => void;
}

export const MovieView = ({ movie, showShuffle, showAbout, onShuffle, onRequireAuth }: MovieViewProps) => {

    const { user, setUser, fetchProfile } = useUser()
    const navigate = useNavigate()
    const [ isTrailerOpen, setTrailerOpen ] = useState(false)

    const handleTrailerOpen = () => {
        setTrailerOpen(true)
    }
    const handleTrailerClose = () => setTrailerOpen(false)

    const isFavorite = user?.favorites?.some(favId => Number(favId) === movie.id) ?? false

    const handleLike = async () => {
        if (!user) {
            if (onRequireAuth) onRequireAuth()
            return
        }

        try {
            const isFavorite = user?.favorites?.some(favId => Number(favId) === movie.id) ?? false

            let updatedUser: User
            if (isFavorite) {
                updatedUser = await deleteFromFavorites(String(movie.id))
            } else {
                updatedUser = await addToFavorites(String(movie.id))
            }
            
            setUser(updatedUser)
            await fetchProfile()
            
        } catch (err) {
            console.error(err)
        }
    }

    const goToMoviePage = () => {
        navigate(`/movie/${movie.id}`)
    }

    return (
        <div className="movie-view">
            <div className="movie-view__wrapper">
                <div className="movie-view__info">
                    <span className={`movie-view__rating ${getRatingColor(movie.tmdbRating)}`}>{<StarIcon />} {movie.tmdbRating}</span>
                    <span className="movie-view__year">{movie.relaseYear} </span>
                    <span className="movie-view__genre">{splitGenres(movie.genres || []).join(", ")} </span>
                    <span className="movie-view__duration">{movie?.runtime} min</span>
                </div>
                <h2 className="movie-view__title">{movie.title}</h2>
                <p className="movie-view__descr">{movie.plot}</p>
                <div className="movie-view__buttons">
                    <button className="movie-view__trailer btn btn--blue btn--big" type="button" onClick={handleTrailerOpen}>Трейлер</button>
                    {isTrailerOpen && (
                        <div className="modal-overlay" onClick={handleTrailerClose}>
                            <div className="movie-view__trailer-frame">
                                <button className="modal__close-btn" onClick={handleTrailerClose}><CloseIcon /></button>
                                <iframe src={getEmbedURL(movie.trailerUrl)}
                                        title={movie.title}
                                        width={960}
                                        height={540}
                                        allow="autoplay"
                                />
                            </div>
                        </div>
                    )}
                    {showAbout && (
                        <button className="movie-view__about btn btn--primary btn--big"
                                type="button"
                                onClick={goToMoviePage}
                        >
                                О фильме
                        </button>
                    )}
                    <button className={`movie-view__like btn btn--primary btn--small ${isFavorite ? "liked" : ""}`} 
                            onClick={handleLike} 
                            type="button" 
                            aria-label="Добавить в избранное">
                                <LikeIcon />
                    </button>
                    {showShuffle && (
                        <button className="movie-view__shuffle btn btn--primary btn--small" onClick={onShuffle} type="button" aria-label="Поменять случайный фильм"><ShuffleIcon /></button>
                    )}
                </div>
            </div>
            {movie.backdropUrl ? (
                <img className="movie-view__poster" src={movie.backdropUrl}
                alt={`Постер к фильму ${movie.title}`} width={680} height={552}/>
            ) : (
                <div className="movie-view__fallback">
                    <MovieProjector />
                </div>
            )}            
        </div>
    )
}