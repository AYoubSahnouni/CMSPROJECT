import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/service/employe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {



  user!: any;

  constructor(private userService: EmployeService){

  }
  ngOnInit(): void {
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      // Parse the stored string back into an object
      this.user = JSON.parse(storedUser);;

      console.log(JSON.stringify(this.user));
    }
  }





}
