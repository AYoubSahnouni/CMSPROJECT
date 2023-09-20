import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {

  constructor() {

  }


  @Output() SendSearchtoEmploye: EventEmitter<string> = new EventEmitter();
  filterValue!: string;

  rechercher(){
    this.SendSearchtoEmploye.emit(this.filterValue)
  }

}
