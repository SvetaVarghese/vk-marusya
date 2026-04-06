import { useEffect, useState } from "react"
import BackIcon from "../../assets/svg/back-icon.svg?react"
import type { Movie } from "../../types/movie"
import { getMoviesByGenre } from "../../api/movies"
import { useParams } from "react-router-dom"
import { MovieCard } from "../../components/MovieCard/MovieCard"
import { Link } from "react-router-dom"
import "./GenrePage.css"

export const GenrePage = () => {

   const { genre } = useParams<{ genre: string }>()
   const [ movies, setMovies] = useState<Movie[]>([])
   const [ error, setError ] = useState<string | null>(null)
   const [ page, setPage ] = useState(1)
   const [ loading, setLoading ] = useState(false)
   const [ hasMore, setHasMore ] = useState(true)

   useEffect(() => {
      if (!genre) return

      const fetchInitialMovies = async () => {
         setMovies([])
         setPage(1)
         setLoading(true)

         try {
            const initialMovies = await getMoviesByGenre(genre, 10, 1)
            setMovies(initialMovies)
            setError(null)
            setPage(2)
         } catch (err) {
            console.error(err)
            setError("Что-то пошло не так :(")
         } finally {
            setLoading(false)
         }
      }

      fetchInitialMovies()
   }, [genre])

   const handleLoadMore = async () => {
      if (!genre || loading || !hasMore) return
      setLoading(true)

      try {
         const newMovies = await getMoviesByGenre(genre, 10, page)
         setMovies(prev => [...prev, ...newMovies])
         setPage(prev => prev +1)

         if (newMovies.length < 10) {
            setHasMore(false)
         }
      } catch (err) {
         console.log(err)
         setError("Что-то пошло не так :(")
      } finally {
         setLoading(false)
      }
   }

   return (
      <section className="genre-page section-offset">
         <div className="container">
            <h1 className="genre-page__title main-title">
               <Link className="genre-page__link" to={"/genres"}>
                  <BackIcon />
                  {genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : "Жанр"}
               </Link>
               </h1>

            {!movies && <p>Загрузка фильмов...</p>}
            {error && <p>{error}</p>}

            <ul className="genre-page__list">
               {movies?.map(movie => (
                  <li className="genre-page__list-item " key={movie.id}>
                     <MovieCard movie={movie}/>
                  </li>
               ))}
            </ul>
            { hasMore && 
               <button className="genre-page__btn btn btn--blue btn--big" onClick={handleLoadMore}>Показать еще</button>
            }

         </div>
      </section>
   )
}