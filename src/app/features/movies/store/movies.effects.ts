import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, concatMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MoviesService } from 'src/app/services/movies.service';
import { loadMovies, loadMoviesError, loadMoviesSuccess } from './movies.actions';


@Injectable()
export class MoviesEffects {

  constructor(private actions$: Actions, private _movies: MoviesService) {}

  loadMovies$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(loadMovies),
      concatMap((data) =>
        this._movies.getAll(data.paginationOptions).pipe(
          map(data => loadMoviesSuccess({ moviesResponse: data })),
          catchError(error => of(loadMoviesError({ error }))))
      )
    );
  });
}
