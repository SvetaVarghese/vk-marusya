import "./GenresPage.css"
import "../../index.css"
import { fetchMovieGenres } from "../../api/movies"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Genre } from "../../types/movie"
import { genreImages, type KnownGenres } from "../../utils/genres"

export const GenresPage = () => {

   const [ genres, setGenres ] = useState<Genre[]>([])
   const [ error, setError ] = useState<string | null>(null)

   useEffect(() => {
      const fetchGenres = async () => {
         try {
            const genres = await fetchMovieGenres()
            setGenres(genres)
            setError(null)
         } catch(err) {
            console.error(err)
            setError("Что-то пошло не так :(")
         }
      }

      fetchGenres()
   }, [])

   return (
      <section className="genres-page section-offset">
         <div className="container">
            <h1 className="genres-page__title main-title">Жанры фильмов</h1>

            {!genres && <p>Загрузка жанров...</p>}
            {error && <p>{error}</p>}

            {genres && !error && (
               <ul className="genres-page__list">
               {genres.map(genre => (
                  <li key={genre} className="genres-page__list-item">
                     <Link className="genre-card" to={`/genres/${genre}`}>
                        <img className="genre-card__img" src={genreImages[genre as KnownGenres]} alt={genre} />
                        <h2 className="genre-card__title">{genre.charAt(0).toUpperCase() + genre.slice(1)}</h2>
                     </Link>
                  </li>
               ))}
            </ul>
            )}
         </div>
      </section>
   )
}