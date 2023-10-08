import { createReducer, on } from "@ngrx/store";
import { loadMovies, loadMoviesSuccess } from "./movies.actions";
import { MovieResponse } from "src/app/interfaces/movie-response";

export const moviesFeatureKey = 'movies';

export interface State {
    response: MovieResponse | null,
    loading: boolean
}

export const initialState: State = {
    response: null,
    loading: false
}

export const reducer = createReducer(
    initialState,
    on(loadMovies, (state) => {
        return {
            ...state,
            loading: true
        }
    }),
    on(loadMoviesSuccess, (state, data) => {
        return {
            ...state,
            loading: false,
            response: data.moviesResponse
        }
    }),
    on(loadMoviesSuccess, (state) => {
        return {
            ...state,
            loading: false
        }
    })
)