import type { Movie, Genre } from "../types/movie";

const BASE_URL = "https://cinemaguide.skillbox.cc/";


// Получение случайного фильма
export const getRandomMovie = async (): Promise<Movie> => {
    const response = await fetch(`${BASE_URL}movie/random`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Не удалось получить случайный фильм")
    }

    const data: Movie = await response.json()
    return data
}

// Получение Топ 10 фильмов
export const getTop10Movies = async (): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}movie/top10`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error ("Не удалось загрузить фильмы с наивысшим рейтингом")
    }

    const data: Movie[] = await response.json()
    return data
}

//Получение фильма по id
export const getMovieById = async (id: number): Promise<Movie> => {
    const response = await fetch(`${BASE_URL}movie/${id}`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error ("Не удалось загрузить информацию о фильме")
    }

    const data: Movie = await response.json()
    return data
}

//Получение списка жанров
export const fetchMovieGenres = async (): Promise<Genre[]> => {
    const response = await fetch(`${BASE_URL}movie/genres`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Не удалось загрузить список жанров")
    }

    const data: Genre[] = await response.json()
    return data
}

//Получение фильмов по жанру
export const getMoviesByGenre = async (genre: string, count = 10, page = 1 ): Promise<Movie[]> => {
    const response = await fetch (`${BASE_URL}movie?genre=${genre}&count=${count}&page=${page}`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Не удалось загрузить фильма по жанру")
    }

    const data:Movie[] = await response.json()
    return data
}

// Получение избранных фильмов
export const getFavoriteMovies = async (): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}favorites`, {
        method: "GET",
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Не удалось загрузить избранные фильмы")
    }

    const data:Movie[] = await response.json()
    return data
}

// Поиск фильмов по названию
export const searchMovies = async (title: string): Promise<Movie[]> => {
    const response = await fetch(`${BASE_URL}movie?title=${encodeURIComponent(title)}&count=5`, {
        method: "GET",
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error("Не удалось найти фильмы")
    }

    const data: Movie[] = await response.json()
    return data
} 