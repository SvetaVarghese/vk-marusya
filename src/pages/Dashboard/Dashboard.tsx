import "./Dashboard.css"
import "../../index.css"
import { MovieView } from "../../components/MovieView/MovieView.tsx"
import { getRandomMovie, getTop10Movies } from "../../api/movies.ts"
import { useEffect, useState } from "react"
import type { Movie } from "../../types/movie.ts"
import { MovieCard } from "../../components/MovieCard/MovieCard.tsx"
import { ModalManager, type ModalType } from "../../components/Modals/ModalManager.tsx"


export const Dashboard = () => {

    const [ randomMovie, setRandomMovie ] = useState<Movie | null>(null)
    const [ errorRandom, setErrorRandom ] = useState<string | null>(null)
    const [ topMovies, setTopMovies ] = useState<Movie[]>([])
    const [ errorTop, setErrorTop ] = useState<string | null>(null)
    const [ activeModal, setActiveModal ] = useState<ModalType | null>(null)

    const fetchRandomMovie = async () => {
        try {
            const movie = await getRandomMovie()
            setRandomMovie(movie)
            setErrorRandom(null)
        }
        catch (err) {
            console.error(err)
            setErrorRandom("Что-то пошло не так :(")
        }
    }

    useEffect(() => {
        let isMounted = true

        const loadMovies = async () => {
            try {
                const movie = await getRandomMovie()
                const topMovies = await getTop10Movies()
                if(isMounted) {
                    setRandomMovie(movie)
                    setTopMovies(topMovies)
                    setErrorRandom(null)
                    setErrorTop(null)
                }
            } catch (err) {
                if (isMounted) {
                    console.error(err)
                    setErrorRandom("Что-то пошло не так :(")
                    setErrorTop("Что-то пошло не так :(")
                }
            }
        }

        loadMovies()

        return () => { isMounted = false }
    }, [])


    return (
        <section className="main-page">
            <div className="container">
                <h1 className="main-page__title visually-hidden">Главная страница</h1>
                <div className="main-page__wrapper">
                    {/* Случайный фильм */}
                    {errorRandom ? (
                        <p className="random-movie__error">{errorRandom}</p>
                        ) : randomMovie ? (
                        <MovieView 
                            movie={randomMovie}
                            showAbout={true}
                            showShuffle={true}
                            onShuffle={fetchRandomMovie}
                            onRequireAuth={() => setActiveModal("login")}
                        />
                        ) : (
                        <div className="random-movie__loading">
                            Загрузка случайного фильма...
                        </div>
                    )}
                    

                    {/* Топ-10 лучших фильмов */}
                    <div className="top-movies">
                        {errorTop && (<p className="random-movie__error">{errorTop}</p>)}
                        <h3 className="top-movies__title">Топ 10 фильмов</h3>
                        <ul className="top-movies__list">
                            {topMovies.map((movie, index) => (
                                <li className="top-movies__list-item" key={movie.id}>
                                    <MovieCard movie={movie} rank={index + 1} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <ModalManager activeModal={activeModal} setActiveModal={setActiveModal} />
            </div>
        </section>
    )
}