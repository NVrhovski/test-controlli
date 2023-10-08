import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromMovies from './movies.reducers';

export const selectMoviesState = createFeatureSelector<fromMovies.State>(
    fromMovies.moviesFeatureKey
);

export const selectMoviesResponse = createSelector(
    selectMoviesState,
    (state) => state.response
)

export const selectLoadingMovies = createSelector(
    selectMoviesState,
    (state) => state.loading
)