import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { moviesFeatureKey, reducer } from './store/movies.reducers';
import { MoviesEffects } from './store/movies.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(moviesFeatureKey, reducer),
    EffectsModule.forFeature([MoviesEffects])
  ]
})
export class MoviesStoreModule { }
