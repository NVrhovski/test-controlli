import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  form: FormGroup;
  searchError: boolean;
  @Output() searchEvent: EventEmitter<string>;
  
  constructor(
    private _fb: FormBuilder
  )
  {
    this.searchError = false;
    this.searchEvent = new EventEmitter();
    this.form = this._fb.group({
      name: ['', Validators.minLength(5)]
    })
  }

  handleSubmit(): void 
  {
    if(this.form.get('name')?.value !== '' && this.form.valid)
    {
      this.searchError = false
      this.searchEvent.emit(this.form.get('name')?.value)
    }else
    {
      this.searchError = true
    }
  }
}
