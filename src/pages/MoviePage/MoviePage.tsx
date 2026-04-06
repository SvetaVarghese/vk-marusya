import { useEffect, useState } from "react"
import { MovieView } from "../../components/MovieView/MovieView"
import type { Movie } from "../../types/movie"
import { getMovieById } from "../../api/movies"
import { useParams } from "react-router-dom"
import "./MoviePage.css"
import { ModalManager, type ModalType } from "../../components/Modals/ModalManager"

export const MoviePage = () => {

    const [ movie, setMovie] = useState<Movie | null>(null)
    const [ error, setError] = useState<string | null>(null)
    const [ activeModal, setActiveModal ] = useState<ModalType | null>(null)


    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const movie = await getMovieById(Number(id))
                setMovie(movie)
                setError(null)
            } catch (err) {
                console.error(err)
                setError("Что-то пошло не так :(")
            }
        }

        fetchMovie()
    }, [id])

    return (
        <section className="movie-page">
            <div className="container">
                <div className="movie-page__wrapper">
                {error ? (
                    <p>{error}</p>
                ) : movie ? (
                    <MovieView movie={movie} showAbout={false} showShuffle={false} onRequireAuth={() => setActiveModal("login")}/>
                ) : (
                    <p className="movie-page__loader">Загрузка фильма...</p>
                )}

                <div className="movie-info">
                    <h2 className="movie-info__title">О фильме</h2>
                    <ul className="movie-info__list">
                        <li className="movie-info__list-item">
                            <div className="movie-info__category-wrap">
                                <span className="movie-info__category">Язык&nbsp;оригинала</span>
                                <div className="movie-info__dashed-line"></div>
                            </div>
                            <span className="movie-info__category-value">{movie?.languages.join(", ") || "Нет информации"}</span>
                        </li>
                        <li className="movie-info__list-item">
                            <div className="movie-info__category-wrap">
                                <span className="movie-info__category">Бюджет</span>
                                <div className="movie-info__dashed-line"></div>
                            </div>
                            <span className="movie-info__category-value">{movie?.budget || "Нет информации"}</span>
                        </li>
                        <li className="movie-info__list-item">
                            <div className="movie-info__category-wrap">
                                <span className="movie-info__category">Выручка</span>
                                <div className="movie-info__dashed-line"></div>
                            </div>
                            <span className="movie-info__category-value">{movie?.revenue || "Нет информации"}</span>
                        </li>
                        <li className="movie-info__list-item">
                            <div className="movie-info__category-wrap">
                                <span className="movie-info__category">Режиссёр</span>
                                <div className="movie-info__dashed-line"></div>
                            </div>
                            <span className="movie-info__category-value">{movie?.director || "Нет информации"}</span>
                        </li>
                        <li className="movie-info__list-item">
                            <div className="movie-info__category-wrap">
                                <span className="movie-info__category">Продакшен</span>
                                <div className="movie-info__dashed-line"></div>
                            </div>
                            <span className="movie-info__category-value">{movie?.production || "Нет информации"}</span>
                        </li>
                        <li className="movie-info__list-item">
                            <div className="movie-info__category-wrap">
                                <span className="movie-info__category">Награды</span>
                                <div className="movie-info__dashed-line"></div>
                            </div>
                            <span className="movie-info__category-value">{movie?.awardsSummary || "Нет информации"}</span>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            <ModalManager activeModal={activeModal} setActiveModal={setActiveModal} />
        </section>
    )
}