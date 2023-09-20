import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

   constructor(   private authService: AuthentificationService,
     private router: Router){}

  @Output() toggleSideBarEmitte: EventEmitter<any> = new EventEmitter();

  togglesidebar(){
      this.toggleSideBarEmitte.emit();
      setTimeout(() => {
        window.dispatchEvent(
          new Event('resize')
        );
      }, 300);
  }

  logout(){
    console.log("logout");
    this.authService.logout();
    this.router.navigate(['/login'])
  }

}
