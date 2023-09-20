import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  constructor(){}
  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem("user")??"no user");

  }
  user!:any;


}
