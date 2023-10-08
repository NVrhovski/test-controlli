import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { MoviePaginationOptions } from '../interfaces/movie-pagination-options';
import { Observable } from 'rxjs';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private _http: HttpClient
  ) { }

  getAll(pagination: MoviePaginationOptions): Observable<MovieResponse>{
    return this._http.get<MovieResponse>(environment.baseURL, 
      {
        params: 
        {
          apikey: environment.apiKey,
          s: pagination.search,
          page: pagination.page
        }
      })
  }
}
