import { Component } from '@angular/core';

@Component({
  selector: 'app-defaults',
  templateUrl: './defaults.component.html',
  styleUrls: ['./defaults.component.scss']
})
export class DefaultsComponent {

  sidebaropened = false;



  ngOnInit(){

  }
  sidebartoggler(s: boolean){
    this.sidebaropened=!this.sidebaropened;
  }
}
