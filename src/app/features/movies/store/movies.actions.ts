import { createAction, props } from "@ngrx/store";
import { MoviePaginationOptions } from "src/app/interfaces/movie-pagination-options";
import { MovieResponse } from "src/app/interfaces/movie-response";

export const loadMovies = createAction(
    '[Movies] Load movies',
    props<{ paginationOptions: MoviePaginationOptions }>()
)

export const loadMoviesSuccess = createAction(
    '[Movies] Load movies success',
    props<{ moviesResponse: MovieResponse }>()
)

export const loadMoviesError = createAction(
    '[Movies] Load movies error',
    props<{ error: any }>()
)