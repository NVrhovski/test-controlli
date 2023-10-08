import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Movie } from 'src/app/interfaces/movie';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent {

  favoriteMovies: Movie[] | null;
  descriptionForm: FormGroup;
  filterForm: FormGroup;
  selectedMovieId: string;
  descriptionError: boolean;
  @ViewChild('closeModal') closeModal: ElementRef

  constructor(
    private _title: Title,
    private _fb: FormBuilder
  ){
    this.descriptionError = false;
    this.descriptionForm = this._fb.group({
      description: ['', Validators.required]
    })
    this.filterForm = this._fb.group({
      year: [''],
      type: ['']
    })
    this._title.setTitle("Test Controlli | Favorites");
    this.favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));
    this.favoriteMovies.forEach((movie) => {
      movie.hide = false;
    })
  }

  selectFavoriteMovie(id: string){
    this.selectedMovieId = id;
    this.favoriteMovies.forEach((movie) => {
      if(movie.imdbID == this.selectedMovieId)
      {
        this.descriptionForm.get('description').setValue(movie.description || '');
      }
    })
  }

  handleDescriptionSave(){
    if(this.descriptionForm.get('description')?.value !== '' && this.descriptionForm.valid)
    {
      this.favoriteMovies.forEach((movie) => {
        if(movie.imdbID == this.selectedMovieId)
        {
          movie.description = this.descriptionForm.get('description')?.value;
        }
      })
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies))
      this.descriptionError = false;
      this.descriptionForm.get('description').setValue('');
      this.closeModal.nativeElement.click();
    }else
    {
      this.descriptionError = true;
    }
  }

  handleFilter()
  {
    this.favoriteMovies.forEach((movie) => {
      if(this.filterForm.get('year').value != '')
      {
        if(this.filterForm.get('year').value != movie.Year)
        {
          movie.hide = true;
        }else
        {
          movie.hide = false;
        }
      }else
      {
        movie.hide = false;
      }
      if(this.filterForm.get('type').value != '')
      {
        if(this.filterForm.get('type').value != movie.Type || movie.hide)
        {
          movie.hide = true;
        }
      }
    })
  }

  handleResetFilters()
  {
    this.filterForm.get('year').setValue('');
    this.filterForm.get('type').setValue('');
    this.favoriteMovies.forEach((movie) => {
      movie.hide = false;
    })
  }

  removeFromFavorites(id: string){
    this.favoriteMovies.forEach((movie, index) => {
      if(movie.imdbID == id)
      {
        this.favoriteMovies.splice(index, 1)
      }
    })
    localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies))
  }
}
