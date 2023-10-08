import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesTableComponent } from 'src/app/features/movies/pages/movies-table/movies-table.component';
import { FavoriteMoviesComponent } from './pages/favorite-movies/favorite-movies.component';

const routes: Routes = [
  {path: '', component: MoviesTableComponent},
  {path: 'favorites', component: FavoriteMoviesComponent},
  {path: '**', component: MoviesTableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
