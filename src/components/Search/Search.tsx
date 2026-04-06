import "../../index.css"
import "./Search.css"
import { useEffect, useRef, useState } from "react";
import SearchIcon from "../../assets/svg/search-icon.svg?react"
import StarIcon from "../../assets/svg/star-icon.svg?react"
import CloseIcon from "../../assets/svg/modal-close-icon.svg?react"
import type { Movie } from "../../types/movie";
import { splitGenres } from "../../utils/genres";
import { Link } from "react-router-dom";
import { searchMovies } from "../../api/movies";
import { getRatingColor } from "../../utils/getRatingColor";


interface SearchProps {
    placeholder: string;
    isMobile?: boolean;
}

export const Search = ({ placeholder, isMobile = false }: SearchProps) => {

    const [ value, setValue ] = useState("")
    const [ results, setResults ] = useState<Movie[]>([])
    const [ isOpen, setIsOpen] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        // debounce
        const handler = setTimeout(async () => {
            if (value.trim().length < 2) {
                setResults([])
                setIsOpen(false)
                return
            }

            setLoading(true)

            try {
                const data = await searchMovies(value)
                setResults(data)
                setIsOpen(data.length > 0)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }, 300)

        return () => clearTimeout(handler)

    }, [value])

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                if (!isMobile) {
                    setIsOpen(false)
                }
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [isMobile])

    const handleMobileSearchClick = () => {
        setIsOpen(true)
        setTimeout(() => {
            inputRef.current?.focus()
        }, 100)
    }

    const handleCloseMobileSearch = () => {
        setIsOpen(false)
        setValue("")
        setResults([])
        
    }

    if (isMobile && isOpen) {
        return (
            <div className="mobile-search__overlay">
                <div className="mobile-search__header" role="dialog">
                    <SearchIcon className="search-icon" />
                    <input  type="text"
                            className="mobile-search__input"
                            ref={inputRef}
                            placeholder={placeholder}
                            autoFocus
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                    />
                    <button  className="close-icon"
                                onClick={handleCloseMobileSearch}
                                aria-label="Закрыть поиск"
                    > 
                        <CloseIcon />
                    </button>
                </div>

                {results.length > 0 && (
                    <ul className="search-results">
                        {results.map(movie => (
                            <li className="search-results__item" 
                                key={movie.id}
                            >
                                <Link to={`/movie/${movie.id}`} className="result-card" onClick={handleCloseMobileSearch}>
                                    <img src={movie.posterUrl} alt={movie.title} width={40} height={52}/>
                                    <div className="result-card__wrapper">
                                        <div className="result-card__info">
                                            <span className={`result-card__rating ${getRatingColor(movie.tmdbRating)}`}>{<StarIcon />} {movie.tmdbRating}</span>
                                            <span className="result-card__year">{movie.relaseYear} </span>
                                            <span className="result-card__genre">{splitGenres(movie.genres || []).join(", ")} </span>
                                            <span className="result-card__duration">{movie?.runtime} min</span>
                                        </div>
                                        <h3 className="result-card__title">{movie.title}</h3>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        )
    }


    return (
        <div className={`search ${isMobile ? 'search--mobile' : ''}`} ref={wrapperRef}>
            {isMobile ? (
                <button 
                    className="mobile-search__trigger"
                    onClick={handleMobileSearchClick}
                    aria-label="Поиск"
                >
                    <SearchIcon />
                </button>
            ) : (
                <>
                    <SearchIcon className="search-icon"/>
                    <input
                        className="search-bar"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onFocus={() => value && setIsOpen(true)}
                    />

                    {loading && (
                        <div className="search-loading">Поиск...</div>
                    )}

                    {isOpen && results.length > 0 && (
                        <ul className="search-results">
                            {results.map(movie => (
                                <li className="search-results__item" 
                                    key={movie.id}
                                >
                                    <Link to={`/movie/${movie.id}`} className="result-card" onClick={() => setIsOpen(false)}>
                                        <img src={movie.posterUrl} alt={movie.title} width={40} height={52}/>
                                        <div className="result-card__wrapper">
                                            <div className="result-card__info">
                                                <span className={`result-card__rating ${getRatingColor(movie.tmdbRating)}`}>{<StarIcon />} {movie.tmdbRating}</span>
                                                <span className="result-card__year">{movie.relaseYear} </span>
                                                <span className="result-card__genre">{splitGenres(movie.genres || []).join(", ")} </span>
                                                <span className="result-card__duration">{movie?.runtime} min</span>
                                            </div>
                                            <h3 className="result-card__title">{movie.title}</h3>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
            
        </div>
    )
}