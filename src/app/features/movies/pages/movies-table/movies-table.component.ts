import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectLoadingMovies, selectMoviesResponse } from '../../store/movies.selectors';
import { Subscription } from 'rxjs';
import { loadMovies } from '../../store/movies.actions';
import { PageEvent } from '@angular/material/paginator';
import { Movie } from 'src/app/interfaces/movie';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss']
})
export class MoviesTableComponent implements OnDestroy{

  moviesSubscription: Subscription;
  loadingSubscription: Subscription;
  totalPages: number;
  currentPage: number;
  totalRecords: number;
  search: string;
  loading: boolean;
  areMovies: boolean;
  movies: Movie[];
  favoriteMovies: Movie[];
  displayedColumns: string[];

  constructor(
    private _store: Store,
    private _title: Title
  )
  {
    this._title.setTitle("Test Controlli | Movies");
    this.areMovies = true;
    this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));

    this.moviesSubscription = this._store.select(selectMoviesResponse).subscribe((res) => {
      if(res?.Response == "True")
      {
        this.areMovies = true;
        this.totalPages = Math.ceil(parseInt(res?.totalResults || '0') / 10);
        this.totalRecords = parseInt(res.totalResults);
        this.movies = [...res.Search];
        this.movies.forEach((movie, movieIndex) => {
          this.favoriteMovies.forEach((favoriteMovie) => {
            if(movie.imdbID == favoriteMovie.imdbID)
            {
              this.movies[movieIndex] = {...movie, favorite: true}
            }
          })
        })
        if(!this.currentPage)
        {
          this.currentPage = 1;
        }
      }else
      {
        this.areMovies = false
      }
    })

    this.loadingSubscription = this._store.select(selectLoadingMovies).subscribe((res) => {
      this.loading = res;
    })

    this.displayedColumns = ['Title', 'Type', 'Year', 'Poster', 'Favorite']
  }

  handleSearchEvent(search: string): void {
    this.search = search;
    this._store.dispatch(loadMovies({paginationOptions: {search, page: '1'}}));
  }
  
  handlePageEvent(event: PageEvent): void{
    this.currentPage = event.pageIndex + 1
    console.log(this.currentPage)
    this._store.dispatch(loadMovies({paginationOptions: {search: this.search, page: this.currentPage.toString()}}));
  }

  addToFavorites(movie: Movie): void {
    if(this.favoriteMovies)
    {
      let isInFavorites = false;
      this.favoriteMovies.forEach((favoriteMovie, index) => {
        if(favoriteMovie.imdbID == movie.imdbID)
        {
          isInFavorites = true;
          this.favoriteMovies.splice(index, 1);
        }
      })
      if(!isInFavorites)
      {
        this.favoriteMovies.push(movie)
      }
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    }else
    {
      this.favoriteMovies = [movie];
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    }
    console.log(this.currentPage)
    this._store.dispatch(loadMovies({paginationOptions: {search: this.search, page: this.currentPage.toString()}}))
  }
  
  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
